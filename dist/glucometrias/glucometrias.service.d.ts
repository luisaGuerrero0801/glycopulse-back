import { CreateGlucometriaDto } from './dto/create-glucometria.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Glucometria } from './entities/glucometria.entity';
import { UpdateGlucometriaDto } from './dto/update-glucometria.dto';
import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';
import { ResponseGlucometriaDto } from './dto/response-glucometria.dto';
export declare class GlucometriasService {
    private readonly usuario;
    private readonly glucometria;
    private readonly rango;
    constructor(usuario: Repository<Usuario>, glucometria: Repository<Glucometria>, rango: Repository<RangoGlucometria>);
    private analizarGlucometria;
    private toResponseDto;
    create(createGlucometriaDto: CreateGlucometriaDto, userId: string): Promise<ResponseGlucometriaDto>;
    update(idGlucometria: number, updateGlucometriaDto: UpdateGlucometriaDto, userId: string): Promise<ResponseGlucometriaDto>;
    remove(idGlucometria: number): Promise<{
        message: string;
    }>;
    findAllByUser(userId: string, filters?: {
        fechaGlucometria?: string;
        rangoGlucometria?: string;
        orderFecha?: 'ASC' | 'DESC';
        orderNivel?: 'ASC' | 'DESC';
    }): Promise<ResponseGlucometriaDto[]>;
    findOneById(id: number): Promise<ResponseGlucometriaDto>;
    findLastByUser(userId: string): Promise<{
        fecha: string;
        hora: string;
    }>;
    getNombresRangosUnicos(): Promise<string[]>;
    private formatearFecha;
    private formatGlucometriaDateTime;
}
