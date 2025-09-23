import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  UsuarioRolSeed,
  EstadoSeed,
  RangoSeed,
  RecomendacionSeed,
  RecomendacionEstadoSeed,
} from './index.seed';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly usuarioRolSeed: UsuarioRolSeed,
    private readonly estadoSeed: EstadoSeed,
    private readonly rangoSeed: RangoSeed,
    private readonly recomendacionSeed: RecomendacionSeed,
    private readonly recomendacionEstadoSeed: RecomendacionEstadoSeed
  ) {}

  async onModuleInit() {
    console.log('🌱 Ejecutando seeders...');
    await this.runSeeds();
  }

  private async runSeeds() {
    await this.usuarioRolSeed.run();
    await this.estadoSeed.run();
    await this.rangoSeed.run();
    await this.recomendacionSeed.run();
    await this.recomendacionEstadoSeed.run();

    console.log('✅ Todos los seeders ejecutados correctamente');
  }
}
