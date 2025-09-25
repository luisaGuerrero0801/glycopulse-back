import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';
import { MomentoGlucometria } from 'src/glucometrias/enums/momento-glucometria.enum';

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
        estado: 'Hipoglucemia Critica Ayunas', // Corregido: sin tilde para coincidir con EstadoSeed
        momento: MomentoGlucometria.AYUNAS,
      },
      {
        nombre: 'Muy Bajo',
        min: 55,
        max: 69,
        estado: 'Hipoglucemia Ayunas',
        momento: MomentoGlucometria.AYUNAS,
      },
      {
        nombre: 'Bajo',
        min: 70,
        max: 79,
        estado: 'Bajo Ayunas',
        momento: MomentoGlucometria.AYUNAS,
      },
      {
        nombre: 'Normal',
        min: 80,
        max: 130,
        estado: 'Óptimo Ayunas',
        momento: MomentoGlucometria.AYUNAS,
      },
      {
        nombre: 'Alto',
        min: 131,
        max: 180,
        estado: 'Alto Ayunas',
        momento: MomentoGlucometria.AYUNAS,
      },
      {
        nombre: 'Muy Alto',
        min: 181,
        max: 399,
        estado: 'Hiperglucemia Ayunas',
        momento: MomentoGlucometria.AYUNAS,
      },
      {
        nombre: 'Critica Alto',
        min: 400,
        max: 700,
        estado: 'Hiperglucemia Critica Ayunas', // Corregido: sin tilde
        momento: MomentoGlucometria.AYUNAS,
      },

      // 🔹 Preprandial
      {
        nombre: 'Critica Bajo',
        min: 30,
        max: 54,
        estado: 'Hipoglucemia Critica Preprandial', // Este sí tiene tilde en EstadoSeed
        momento: MomentoGlucometria.PREPRANDIAL,
      },
      {
        nombre: 'Muy Bajo',
        min: 55,
        max: 69,
        estado: 'Hipoglucemia Preprandial',
        momento: MomentoGlucometria.PREPRANDIAL,
      },
      {
        nombre: 'Bajo',
        min: 70,
        max: 79,
        estado: 'Bajo Preprandial',
        momento: MomentoGlucometria.PREPRANDIAL,
      },
      {
        nombre: 'Normal',
        min: 80,
        max: 130,
        estado: 'Óptimo Preprandial',
        momento: MomentoGlucometria.PREPRANDIAL,
      },
      {
        nombre: 'Alto',
        min: 131,
        max: 180,
        estado: 'Alto Preprandial',
        momento: MomentoGlucometria.PREPRANDIAL,
      },
      {
        nombre: 'Muy Alto',
        min: 181,
        max: 399,
        estado: 'Hiperglucemia Preprandial',
        momento: MomentoGlucometria.PREPRANDIAL,
      },
      {
        nombre: 'Critica Alto',
        min: 400,
        max: 700,
        estado: 'Hiperglucemia Critica Preprandial', // Corregido: sin tilde
        momento: MomentoGlucometria.PREPRANDIAL,
      },

      // 🔹 Postprandial
      {
        nombre: 'Critica Bajo',
        min: 30,
        max: 54,
        estado: 'Hipoglucemia Critica Postprandial', // Este sí tiene tilde
        momento: MomentoGlucometria.POSTPRANDIAL,
      },
      {
        nombre: 'Muy Bajo',
        min: 55,
        max: 69,
        estado: 'Hipoglucemia Postprandial',
        momento: MomentoGlucometria.POSTPRANDIAL,
      },
      {
        nombre: 'Bajo',
        min: 70,
        max: 79,
        estado: 'Bajo Postprandial',
        momento: MomentoGlucometria.POSTPRANDIAL,
      },
      {
        nombre: 'Normal',
        min: 80,
        max: 180,
        estado: 'Óptimo Postprandial',
        momento: MomentoGlucometria.POSTPRANDIAL,
      },
      {
        nombre: 'Alto',
        min: 181,
        max: 250,
        estado: 'Alto Postprandial',
        momento: MomentoGlucometria.POSTPRANDIAL,
      },
      {
        nombre: 'Muy Alto',
        min: 251,
        max: 399,
        estado: 'Hiperglucemia Postprandial',
        momento: MomentoGlucometria.POSTPRANDIAL,
      },
      {
        nombre: 'Critica Alto',
        min: 400,
        max: 700,
        estado: 'Hiperglucemia Critica Postprandial', // Este sí tiene tilde
        momento: MomentoGlucometria.POSTPRANDIAL,
      },

      // 🔹 Otros momentos
      {
        nombre: 'Critica Bajo',
        min: 30,
        max: 54,
        estado: 'Hipoglucemia Critica', // Corregido: coincide con EstadoSeed
        momento: MomentoGlucometria.OTRO,
      },
      {
        nombre: 'Muy Bajo',
        min: 55,
        max: 69,
        estado: 'Hipoglucemia', // Corregido: sin "Otros"
        momento: MomentoGlucometria.OTRO,
      },
      {
        nombre: 'Bajo',
        min: 70,
        max: 79,
        estado: 'Bajo', // Corregido: sin "Otros"
        momento: MomentoGlucometria.OTRO,
      },
      {
        nombre: 'Normal',
        min: 80,
        max: 130,
        estado: 'Óptimo', // Corregido: sin "Otros"
        momento: MomentoGlucometria.OTRO,
      },
      {
        nombre: 'Alto',
        min: 131,
        max: 180,
        estado: 'Alto', // Corregido: sin "Otros"
        momento: MomentoGlucometria.OTRO,
      },
      {
        nombre: 'Muy Alto',
        min: 181,
        max: 399,
        estado: 'Hiperglucemia', // Corregido: sin "Otros"
        momento: MomentoGlucometria.OTRO,
      },
      {
        nombre: 'Critica Alto',
        min: 400,
        max: 700,
        estado: 'Hiperglucemia Critica', // Corregido: sin "Otros" y sin tilde
        momento: MomentoGlucometria.OTRO,
      },
    ];

    let contadorRangos = 0;
    let estadosNoEncontrados = 0;

    for (const r of rangos) {
      const estado = estados.find((e) => e.nombreEstado === r.estado);

      if (!estado) {
        console.log(`❌ No se encontró el estado: "${r.estado}"`);
        estadosNoEncontrados++;
        continue;
      }

      const existe = await this.rangoRepo.findOne({
        where: { nombreRango: r.nombre, momento: r.momento },
      });

      if (!existe) {
        await this.rangoRepo.save(
          this.rangoRepo.create({
            nombreRango: r.nombre,
            valorMinRango: r.min,
            valorMaxRango: r.max,
            estado,
            momento: r.momento,
          })
        );
        contadorRangos++;
      }
    }

    console.log(`✅ ${contadorRangos} rangos insertados correctamente`);
    if (estadosNoEncontrados > 0) {
      console.log(
        `⚠️  ${estadosNoEncontrados} estados no encontrados en RangoSeed`
      );
    }
  }
}
