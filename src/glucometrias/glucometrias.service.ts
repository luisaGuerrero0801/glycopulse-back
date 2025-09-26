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
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';
import { MomentoGlucometria } from './enums/momento-glucometria.enum';
import { ResponseGlucometriaDto } from './dto/response-glucometria.dto';
import { RecomendacionesGlucometria } from 'src/recomendaciones-glucometria/entities/recomendaciones-glucometria.entity';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';

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
    estado: EstadoGlucometria,
    recomendaciones: RecomendacionesGlucometria[]
  ): ResponseGlucometriaDto {
    const fechaFormateada = format(
      new Date(glucometria.fechaGlucometria),
      'EEE dd MMM yyyy',
      { locale: es }
    );

    const horaFormateada = format(
      new Date(`1970-01-01T${glucometria.horaGlucometria}`),
      'hh:mm a',
      { locale: es }
    );

    return {
      idGlucometria: glucometria.idGlucometria,
      fechaGlucometria: fechaFormateada,
      horaGlucometria: horaFormateada,
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

    const glucometria = await this.glucometria.findOne({
      where: { idGlucometria: idGlucometria },
      relations: ['usuario'],
    });
    if (!glucometria) throw new NotFoundException('Glucometría no encontrada');

    const { rango, estado, recomendaciones } = await this.analizarGlucometria(
      updateGlucometriaDto.nivelGlucometria ?? glucometria.nivelGlucometria,
      updateGlucometriaDto.momento ?? glucometria.momento
    );

    // Asignar los nuevos valores al objeto glucometria
    Object.assign(glucometria, {
      fechaGlucometria:
        updateGlucometriaDto.fechaGlucometria ?? glucometria.fechaGlucometria,
      horaGlucometria:
        updateGlucometriaDto.horaGlucometria ?? glucometria.horaGlucometria,
      nivelGlucometria:
        updateGlucometriaDto.nivelGlucometria ?? glucometria.nivelGlucometria,
      momento: updateGlucometriaDto.momento ?? glucometria.momento,
      usuario,
      rango,
    });

    const glucometriaActualizada = await this.glucometria.save(glucometria);

    return this.toResponseDto(
      glucometriaActualizada,
      rango,
      estado,
      recomendaciones
    );
  }

  async remove(idGlucometria: number) {
    const glucometriaBus = await this.glucometria.findOneBy({ idGlucometria });

    if (!glucometriaBus) {
      throw new NotFoundException('Esta no Glucometria existe');
    }
    await this.glucometria.remove(glucometriaBus);
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

  // Buscar todas las glucometrías de un usuario (con filtros opcionales)
  async findAllByUser(
    userId: string,
    filters?: {
      fechaGlucometria?: string;
      horaGlucometria?: string;
      rangoGlucometria?: string;
      orderBy?: 'fecha' | 'hora' | 'nivel';
      order?: 'ASC' | 'DESC';
    }
  ): Promise<ResponseGlucometriaDto[]> {
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
      throw new BadRequestException('El ID de usuario no es válido');
    }

    let query = this.glucometria
      .createQueryBuilder('gluco')
      .leftJoinAndSelect('gluco.usuario', 'usuario')
      .leftJoinAndSelect('usuario.rol', 'rol')
      .leftJoinAndSelect('gluco.rango', 'rango')
      .leftJoinAndSelect('rango.estado', 'estado')
      .leftJoinAndSelect('estado.recomendaciones', 'recomendacionesEstado')
      .leftJoinAndSelect('recomendacionesEstado.recomendacion', 'recomendacion')
      .where('usuario.idUsuario = :userId', { userId: userIdNumber });

    if (filters?.fechaGlucometria) {
      query = query.andWhere('gluco.fechaGlucometria = :fecha', {
        fecha: filters.fechaGlucometria,
      });
    }

    if (filters?.horaGlucometria) {
      query = query.andWhere('gluco.horaGlucometria = :hora', {
        hora: filters.horaGlucometria,
      });
    }

    if (filters?.rangoGlucometria) {
      query = query.andWhere('rango.nombreRango = :rango', {
        rango: filters.rangoGlucometria,
      });
    }

    if (filters?.orderBy) {
      query = query.orderBy(
        `gluco.${filters.orderBy}Glucometria`,
        filters.order ?? 'DESC'
      );
    } else {
      query = query
        .orderBy('gluco.fechaGlucometria', 'DESC')
        .addOrderBy('gluco.horaGlucometria', 'DESC');
    }

    const glucometrias = await query.getMany();

    return glucometrias.map((g) =>
      this.toResponseDto(
        g,
        g.rango,
        g.rango.estado,
        g.rango.estado.recomendaciones.map((re) => re.recomendacion)
      )
    );
  }

  async findOneById(id: number): Promise<ResponseGlucometriaDto> {
    const glucometria = await this.glucometria
      .createQueryBuilder('gluco')
      .leftJoinAndSelect('gluco.usuario', 'usuario')
      .leftJoinAndSelect('usuario.rol', 'rol')
      .leftJoinAndSelect('gluco.rango', 'rango')
      .leftJoinAndSelect('rango.estado', 'estado')
      .leftJoinAndSelect('estado.recomendaciones', 'recomendacionesEstado')
      .leftJoinAndSelect('recomendacionesEstado.recomendacion', 'recomendacion')
      .where('gluco.idGlucometria = :id', { id })
      .getOne();

    if (!glucometria) {
      throw new NotFoundException('Glucometría no encontrada');
    }

    return this.toResponseDto(
      glucometria,
      glucometria.rango,
      glucometria.rango.estado,
      glucometria.rango.estado.recomendaciones.map((re) => re.recomendacion)
    );
  }
}
