import { GlucometriasService } from './glucometrias.service';
import { CreateGlucometriaDto } from './dto/create-glucometria.dto';
import { UpdateGlucometriaDto } from './dto/update-glucometria.dto';
import { Request } from 'express';
export declare class GlucometriasController {
    private readonly glucometrias;
    constructor(glucometrias: GlucometriasService);
    create(createGlucometriaDto: CreateGlucometriaDto, req: Request): Promise<import("./dto/response-glucometria.dto").ResponseGlucometriaDto>;
    findOneById(id: string): Promise<import("./dto/response-glucometria.dto").ResponseGlucometriaDto>;
    getNombresRangos(): Promise<string[]>;
    findLastByUser(userId: string): Promise<{
        fecha: string;
        hora: string;
    }>;
    findAllByUser(userId: string, filters?: {
        fechaGlucometria?: string;
        horaGlucometria?: string;
        rangoGlucometria?: string;
        orderFecha?: 'ASC' | 'DESC';
        orderFechaHora?: 'ASC' | 'DESC';
        orderNivel?: 'ASC' | 'DESC';
    }): Promise<import("./dto/response-glucometria.dto").ResponseGlucometriaDto[]>;
    update(idGlucometria: number, updateGlucometriaDto: UpdateGlucometriaDto, req: Request): Promise<import("./dto/response-glucometria.dto").ResponseGlucometriaDto>;
    remove(idGlucometria: number): Promise<{
        message: string;
    }>;
}
