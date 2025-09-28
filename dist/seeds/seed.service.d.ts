import { OnModuleInit } from '@nestjs/common';
import { UsuarioRolSeed, EstadoSeed, RangoSeed, RecomendacionSeed, RecomendacionEstadoSeed } from './index.seed';
export declare class SeedService implements OnModuleInit {
    private readonly usuarioRolSeed;
    private readonly estadoSeed;
    private readonly rangoSeed;
    private readonly recomendacionSeed;
    private readonly recomendacionEstadoSeed;
    constructor(usuarioRolSeed: UsuarioRolSeed, estadoSeed: EstadoSeed, rangoSeed: RangoSeed, recomendacionSeed: RecomendacionSeed, recomendacionEstadoSeed: RecomendacionEstadoSeed);
    onModuleInit(): Promise<void>;
    private runSeeds;
}
