import { EstadoGlucometriaService } from './estado-glucometria.service';
export declare class EstadoGlucometriaController {
    private readonly estadoGlucometriaService;
    constructor(estadoGlucometriaService: EstadoGlucometriaService);
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
