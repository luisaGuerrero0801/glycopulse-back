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
import { MomentoGlucometria } from './enums/momento-glucometria.enum';
import { ResponseGlucometriaDto } from './dto/response-glucometria.dto';

@Injectable()
export class GlucometriasService {
  constructor(
    @InjectRepository(Usuario) private readonly usuario: Repository<Usuario>,

    @InjectRepository(Glucometria)
    private readonly glucometria: Repository<Glucometria>,

    @InjectRepository(RangoGlucometria)
    private readonly rango: Repository<RangoGlucometria>
  ) {}

  private async analizarGlucometria(
    nivel: number,
    momento: MomentoGlucometria
  ) {
    // Buscar el rango que cumpla con nivel + momento
    const rango = await this.rango
      .createQueryBuilder('rango')
      .leftJoinAndSelect('rango.estado', 'estado')
      .leftJoinAndSelect('estado.recomendaciones', 'recomendacionesEstado')
      .leftJoinAndSelect('recomendacionesEstado.recomendacion', 'recomendacion')
      .where('rango.momento = :momento', { momento })
      .andWhere(':nivel BETWEEN rango.valorMinRango AND rango.valorMaxRango', {
        nivel,
      })
      .getOne();

    if (!rango) {
      throw new NotFoundException(
        `No se encontró rango para el nivel ${nivel} y momento ${momento}`
      );
    }

    return {
      rango,
      estado: rango.estado,
      recomendaciones: rango.estado.recomendaciones.map(
        (re) => re.recomendacion
      ),
    };
  }

  private toResponseDto(
    glucometria: Glucometria,
    rango: RangoGlucometria,
    estado,
    recomendaciones
  ): ResponseGlucometriaDto {
    return {
      idGlucometria: glucometria.idGlucometria,
      fechaGlucometria: glucometria.fechaGlucometria,
      horaGlucometria: glucometria.horaGlucometria,
      nivelGlucometria: glucometria.nivelGlucometria,
      momento: glucometria.momento,
      usuario: {
        idUsuario: glucometria.usuario.idUsuario,
        nombres: glucometria.usuario.nombresUsuario,
        apellidos: glucometria.usuario.apellidosUsuario,
        correo: glucometria.usuario.correoUsuario,
        rol: {
          idRol: glucometria.usuario.rol.idRol,
          nombreRol: glucometria.usuario.rol.nombreRol,
        },
      },
      rango: {
        idRango: rango.idRango,
        nombreRango: rango.nombreRango,
        valorMinRango: rango.valorMinRango,
        valorMaxRango: rango.valorMaxRango,
        momento: rango.momento,
      },
      estado: {
        idEstado: estado.idEstado,
        nombreEstado: estado.nombreEstado,
        descripcionEstado: estado.descripcionEstado,
      },
      recomendaciones: recomendaciones.map((r) => ({
        idRecomendacion: r.idRecomendacion,
        tipoRecomendacion: r.tipoRecomendacion,
        descripcionRecomendacion: r.descripcionRecomendacion,
      })),
    };
  }

  async create(
    createGlucometriaDto: CreateGlucometriaDto,
    userId: string
  ): Promise<ResponseGlucometriaDto> {
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

    const { rango, estado, recomendaciones } = await this.analizarGlucometria(
      createGlucometriaDto.nivelGlucometria,
      createGlucometriaDto.momento
    );

    const nuevaGlucometria = this.glucometria.create({
      fechaGlucometria: createGlucometriaDto.fechaGlucometria,
      horaGlucometria: createGlucometriaDto.horaGlucometria,
      nivelGlucometria: createGlucometriaDto.nivelGlucometria,
      momento: createGlucometriaDto.momento,
      usuario,
      rango,
    });

    const glucoGuardada = await this.glucometria.save(nuevaGlucometria);

    return this.toResponseDto(glucoGuardada, rango, estado, recomendaciones);
  }

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
