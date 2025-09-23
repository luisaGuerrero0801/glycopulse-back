import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';

@Injectable()
export class RangoSeed {
  constructor(
    @InjectRepository(RangoGlucometria)
    private rangoRepo: Repository<RangoGlucometria>,
    @InjectRepository(EstadoGlucometria)
    private estadoRepo: Repository<EstadoGlucometria>
  ) {}

  async run() {
    const estados = await this.estadoRepo.find();

    const rangos = [
      // 🔹 Ayunas
      {
        nombre: 'Critica Bajo',
        min: 30,
        max: 54,
        estado: 'Hipoglucemia Critica Ayunas',
      },
      {
        nombre: 'Muy Bajo',
        min: 55,
        max: 69,
        estado: 'Hipoglucemia Ayunas',
      },
      { nombre: 'Bajo', min: 70, max: 79, estado: 'Bajo Ayunas' },
      { nombre: 'Normal', min: 80, max: 130, estado: 'Óptimo Ayunas' },
      { nombre: 'Alto', min: 131, max: 180, estado: 'Alto Ayunas' },
      {
        nombre: 'Muy Alto',
        min: 181,
        max: 399,
        estado: 'Hiperglucemia Ayunas',
      },
      {
        nombre: 'Critica Alto',
        min: 400,
        max: 700,
        estado: 'Hiperglucemia Critica Ayunas',
      },

      // 🔹 Preprandial
      {
        nombre: 'Critica Bajo',
        min: 30,
        max: 54,
        estado: 'Hipoglucemia Crítica Preprandial',
      },
      {
        nombre: 'Muy Bajo',
        min: 55,
        max: 69,
        estado: 'Hipoglucemia Preprandial',
      },
      { nombre: 'Bajo', min: 70, max: 79, estado: 'Bajo Preprandial' },
      { nombre: 'Normal', min: 80, max: 130, estado: 'Óptimo Preprandial' },
      { nombre: 'Alto', min: 131, max: 180, estado: 'Alto Preprandial' },
      {
        nombre: 'Muy Alto',
        min: 181,
        max: 399,
        estado: 'Hiperglucemia Preprandial',
      },
      {
        nombre: 'Critica Alto',
        min: 400,
        max: 700,
        estado: 'Hiperglucemia Critica Preprandial',
      },

      // 🔹 Postprandial
      {
        nombre: 'Critica Bajo',
        min: 30,
        max: 54,
        estado: 'Hipoglucemia Crítica Postprandial',
      },
      {
        nombre: 'Muy Bajo',
        min: 55,
        max: 69,
        estado: 'Hipoglucemia Postprandial',
      },
      { nombre: 'Bajo', min: 70, max: 79, estado: 'Bajo Postprandial' },
      { nombre: 'Normal', min: 80, max: 180, estado: 'Óptimo Postprandial' },
      { nombre: 'Alto', min: 181, max: 250, estado: 'Alto Postprandial' },
      {
        nombre: 'Muy Alto',
        min: 251,
        max: 399,
        estado: 'Hiperglucemia Postprandial',
      },
      {
        nombre: 'Critica Alto',
        min: 400,
        max: 700,
        estado: 'Hiperglucemia Critica Postprandial',
      },

      // 🔹 Otros momentos
      {
        nombre: 'Critica Bajo',
        min: 30,
        max: 54,
        estado: 'Hipoglucemia Crítica',
      },
      {
        nombre: 'Muy Bajo',
        min: 55,
        max: 69,
        estado: 'Hipoglucemia',
      },
      { nombre: 'Bajo', min: 70, max: 79, estado: 'Bajo' },
      { nombre: 'Normal', min: 80, max: 130, estado: 'Óptimo' },
      { nombre: 'Alto', min: 131, max: 180, estado: 'Alto' },
      {
        nombre: 'Muy Alto',
        min: 181,
        max: 399,
        estado: 'Hiperglucemia',
      },
      {
        nombre: 'Critica Alto',
        min: 400,
        max: 700,
        estado: 'Hiperglucemia Critica',
      },
    ];

    for (const r of rangos) {
      const estado = estados.find((e) => e.nombreEstado === r.estado);
      if (!estado) continue;

      const existe = await this.rangoRepo.findOne({
        where: { nombreRango: r.nombre },
      });
      if (!existe) {
        await this.rangoRepo.save(
          this.rangoRepo.create({
            nombreRango: r.nombre,
            valorMinRango: r.min,
            valorMaxRango: r.max,
            estado,
          })
        );
      }
    }

    console.log('✅ Rangos insertados');
  }
}
