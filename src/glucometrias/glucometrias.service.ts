import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGlucometriaDto } from './dto/create-glucometria.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Glucometria } from './entities/glucometria.entity';
import { UpdateGlucometriaDto } from './dto/update-glucometria.dto';
/**import { es } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';**/
import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';
import { RecomendacionesEstado } from 'src/recomendaciones-estado/entities/recomendaciones-estado.entity';
import { MomentoGlucometria } from './enums/momento-glucometria.enum';

@Injectable()
export class GlucometriasService {
  constructor(
    @InjectRepository(Usuario) private readonly usuario: Repository<Usuario>,

    @InjectRepository(Glucometria)
    private readonly glucometria: Repository<Glucometria>,

    @InjectRepository(RangoGlucometria)
    private readonly rango: Repository<RangoGlucometria>,

    @InjectRepository(RecomendacionesEstado)
    private readonly recomendacionesEstado: Repository<RecomendacionesEstado>
  ) {}

  async analizarGlucometria(nivel: number, momento: MomentoGlucometria) {
    // Buscar el rango que cumpla con nivel + momento
    const rango = await this.rango
      .createQueryBuilder('rango')
      .leftJoinAndSelect('rango.estado', 'estado')
      .where('rango.momento = :momento', { momento })
      .andWhere('rango.min <= :nivel', { nivel })
      .andWhere('rango.max >= :nivel', { nivel })
      .getOne();

    if (!rango) {
      throw new NotFoundException(
        `No se encontró rango para momento=${momento}, nivel=${nivel}`
      );
    }

    // 2️⃣ Buscar recomendaciones asociadas al estado
    const recomendaciones = await this.recomendacionesEstado.find({
      where: { estado: { idEstado: rango.estado.idEstado } },
      relations: ['recomendacion'],
    });

    return {
      rango,
      estado: rango.estado,
      recomendaciones: recomendaciones.map((r) => ({
        id: r.recomendacion.idRecomendacion,
        tipo: r.recomendacion.tipoRecomendacion,
        descripcion: r.recomendacion.descripcionRecomendacion,
      })),
    };
  }

  async create(
    createGlucometriaDto: CreateGlucometriaDto,
    userId: string
  ): Promise<Glucometria> {
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      throw new BadRequestException('El ID de usuario no es válido');
    }

    const usuario = await this.usuario.findOne({
      where: { idUsuario: userIdNumber },
      relations: ['rol'],
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (usuario.rol?.nombreRol !== 'Paciente') {
      throw new Error(
        'Solo se pueden registrar glucometrías para usuarios con rol Paciente'
      );
    }

    const analisis = await this.analizarGlucometria(
      createGlucometriaDto.nivelGlucometria,
      createGlucometriaDto.momento
    );

    const nuevaGlucometria = this.glucometria.create({
      fechaGlucometria: createGlucometriaDto.fechaGlucometria,
      horaGlucometria: createGlucometriaDto.horaGlucometria,
      nivelGlucometria: createGlucometriaDto.nivelGlucometria,
      usuario,
    });

    return await this.glucometria.save(nuevaGlucometria);
  }

  /**async findAll() {
    const registros = await this.glucometria.find({ relations: ['usuario'] });

    return registros.map((g) => {
      return {
        ...g,
        fechaGlucometria: format(
          parseISO(g.fechaGlucometria),
          'EEE dd MMM yyyy',
          { locale: es }
        ),
        hora: format(new Date(`1970-01-01T${g.horaGlucometria}`), 'HH:mm', {
          locale: es,
        }),
      };
    });
  }

  async findByFecha(fecha: string) {
    const glucometriasBuscar = await this.glucometria.find({
      where: { fechaGlucometria: fecha },
      relations: ['usuario'],
      order: { horaGlucometria: 'ASC' },
    });

    if (glucometriasBuscar.length === 0) {
      throw new NotFoundException(
        ' No se encontraron glucometrias para esta fecha'
      );
    }

    return glucometriasBuscar.map((g) => ({
      ...g,
      fechaGlucometria: this.formatFecha(g.fechaGlucometria),
    }));
  }

  async findOne(idGlucometria: number) {
    const glucometria = await this.glucometria.findOneBy({ idGlucometria });

    if (!glucometria) {
      throw new NotFoundException('Glucometría no encontrada');
    }

    return {
      ...glucometria,
      fechaGlucometria: format(
        parseISO(glucometria.fechaGlucometria),
        'EEE dd MMM yyyy',
        { locale: es }
      ),
      hora: format(
        new Date(`1970-01-01T${glucometria.horaGlucometria}`),
        'HH:mm',
        { locale: es }
      ),
    };
  }**/

  async update(
    idGlucometria: number,
    updateGlucometriaDto: UpdateGlucometriaDto,
    userId: string
  ): Promise<Glucometria> {
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      throw new BadRequestException('El ID de usuario no es válido');
    }

    const usuario = await this.usuario.findOne({
      where: { idUsuario: userIdNumber },
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const glucometriaBus = await this.glucometria.findOneBy({ idGlucometria });
    if (!glucometriaBus) {
      throw new NotFoundException('Glucometría no encontrada');
    }

    // Asignar los nuevos valores al objeto glucometriaBus
    Object.assign(glucometriaBus, {
      fechaGlucometria: updateGlucometriaDto.fechaGlucometria,
      horaGlucometria: updateGlucometriaDto.horaGlucometria,
      nivelGlucometria: updateGlucometriaDto.nivelGlucometria,
      usuario,
    });

    return await this.glucometria.save(glucometriaBus);
  }

  async remove(idGlucometria: number) {
    const glucometriaBus = await this.glucometria.findOneBy({ idGlucometria });

    if (!glucometriaBus) {
      throw new NotFoundException('Esta Glucometria existe');
    }
    await this.glucometria.delete(idGlucometria);
    return { message: 'Glucometria eliminada correctamente' };
  }

  private formatFecha(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(fecha);
  }
}
