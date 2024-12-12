import { Module } from '@nestjs/common';
import { GlucometriasService } from './glucometrias.service';
import { GlucometriasController } from './glucometrias.controller';

@Module({
  controllers: [GlucometriasController],
  providers: [GlucometriasService],
})
export class GlucometriasModule {}
