import {
  HttpException,
  HttpStatus,
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

@Injectable()
export class GlucometriasService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
    @InjectRepository(Glucometria)
    private readonly glucometrias: Repository<Glucometria>,
  ) {}

  async create(
    createGlucometriaDto: CreateGlucometriaDto,
  ): Promise<Glucometria> {
    const usuario = await this.usuarios.findOne({
      where: { idUsuario: createGlucometriaDto.idUsuario },
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const nuevaGlucometria = this.glucometrias.create({
      fechaGlucometria: createGlucometriaDto.fechaGlucometria,
      horaGlucometria: createGlucometriaDto.horaGlucometria,
      nivelGlucometria: createGlucometriaDto.nivelGlucometria,
      recomendacionGlucometria: createGlucometriaDto.recomendacionGlucometria,
      usuario,
    });

    return await this.glucometrias.save(nuevaGlucometria);
  }

  async findAll() {
    const registros = await this.glucometrias.find({ relations: ['usuario'] });

    return registros.map((g) => ({
      ...g,
      fechaGlucometria: format(
        new Date(g.fechaGlucometria),
        'EEE dd MMM yyyy',
        { locale: es },
      ),
      hora: format(new Date(`1970-01-01T${g.horaGlucometria}`), 'hh:mm a', {
        locale: es,
      }),
    }));
  }

  async findByFecha(fecha: string) {
    const glucometriasBuscar = await this.glucometrias.find({
      where: { fechaGlucometria: fecha },
      relations: ['usuario'],
      order: { horaGlucometria: 'ASC' },
    });

    if (glucometriasBuscar.length === 0) {
      throw new NotFoundException(
        ' No se encontraron glucometrias para esta fecha',
      );
    }

    return glucometriasBuscar.map((g) => ({
      ...g,
      fechaGlucometria: this.formatFecha(g.fechaGlucometria),
    }));
  }

  async update(
    idGlucometria: number,
    updateGlucometriaDto: UpdateGlucometriaDto,
  ): Promise<Glucometria> {
    const glucometriaBus = await this.glucometrias.findOneBy({ idGlucometria });

    if (!glucometriaBus) {
      throw new NotFoundException('Glucometría no encontrada');
    }

    if (updateGlucometriaDto.idUsuario) {
      const usuario = await this.usuarios.findOneBy({
        idUsuario: updateGlucometriaDto.idUsuario,
      });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }

      glucometriaBus.usuario = usuario;
    }

    Object.assign(glucometriaBus, updateGlucometriaDto);

    return await this.glucometrias.save(glucometriaBus);
  }

  async remove(idGlucometria: number) {
    const glucometriaBus = await this.glucometrias.findOneBy({ idGlucometria });

    if (!glucometriaBus) {
      throw new HttpException('Esta Glucometria existe', HttpStatus.OK);
    }
    await this.glucometrias.delete(idGlucometria);
    throw new HttpException(
      'Glucometria eliminada correctamente',
      HttpStatus.OK,
    );
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
