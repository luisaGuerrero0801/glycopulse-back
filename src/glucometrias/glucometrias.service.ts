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
import { format, parseISO } from 'date-fns';

@Injectable()
export class GlucometriasService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
    @InjectRepository(Glucometria)
    private readonly glucometrias: Repository<Glucometria>
  ) {}

  async create(
    createGlucometriaDto: CreateGlucometriaDto,
    userId: string
  ): Promise<Glucometria> {
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      throw new BadRequestException('El ID de usuario no es válido');
    }

    const usuario = await this.usuarios.findOne({
      where: { idUsuario: userIdNumber },
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const nuevaGlucometria = this.glucometrias.create({
      fechaGlucometria: createGlucometriaDto.fechaGlucometria,
      horaGlucometria: createGlucometriaDto.horaGlucometria,
      nivelGlucometria: createGlucometriaDto.nivelGlucometria,
      usuario,
    });

    return await this.glucometrias.save(nuevaGlucometria);
  }

  async findAll() {
    const registros = await this.glucometrias.find({ relations: ['usuario'] });

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
    const glucometriasBuscar = await this.glucometrias.find({
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
    const glucometria = await this.glucometrias.findOneBy({ idGlucometria });

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

    const usuario = await this.usuarios.findOne({
      where: { idUsuario: userIdNumber },
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const glucometriaBus = await this.glucometrias.findOneBy({ idGlucometria });
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

    return await this.glucometrias.save(glucometriaBus);
  }

  async remove(idGlucometria: number) {
    const glucometriaBus = await this.glucometrias.findOneBy({ idGlucometria });

    if (!glucometriaBus) {
      throw new NotFoundException('Esta Glucometria existe');
    }
    await this.glucometrias.delete(idGlucometria);
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
