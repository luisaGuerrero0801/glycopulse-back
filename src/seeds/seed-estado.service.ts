import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';

@Injectable()
export class EstadoSeed {
  constructor(
    @InjectRepository(EstadoGlucometria)
    private readonly estadoRepo: Repository<EstadoGlucometria>
  ) {}

  async run() {
    const estados = [
      // 🔹 Ayunas
      {
        nombreEstado: 'Hipoglucemia Critica Ayunas',
        descripcionEstado: 'Glucosa <54 mg/dL en ayunas',
      },
      {
        nombreEstado: 'Hipoglucemia Ayunas',
        descripcionEstado: 'Glucosa 54–69 mg/dL en ayunas',
      },
      {
        nombreEstado: 'Bajo Ayunas',
        descripcionEstado: 'Glucosa 70–79 mg/dL en ayunas',
      },
      {
        nombreEstado: 'Óptimo Ayunas',
        descripcionEstado: 'Glucosa 80–130 mg/dL en ayunas',
      },
      {
        nombreEstado: 'Alto Ayunas',
        descripcionEstado: 'Glucosa 131–180 mg/dL en ayunas',
      },
      {
        nombreEstado: 'Hiperglucemia Ayunas',
        descripcionEstado: 'Glucosa 181–399 mg/dL en ayunas',
      },
      {
        nombreEstado: 'Hiperglucemia Critica Ayunas',
        descripcionEstado: 'Glucosa ≥400 mg/dL en ayunas',
      },

      // 🔹 Preprandial
      {
        nombreEstado: 'Hipoglucemia Critica Preprandial',
        descripcionEstado: 'Glucosa <54 mg/dL antes de comida',
      },
      {
        nombreEstado: 'Hipoglucemia Preprandial',
        descripcionEstado: 'Glucosa 54–69 mg/dL antes de comida',
      },
      {
        nombreEstado: 'Bajo Preprandial',
        descripcionEstado: 'Glucosa 70–79 mg/dL antes de comida',
      },
      {
        nombreEstado: 'Óptimo Preprandial',
        descripcionEstado: 'Glucosa 80–130 mg/dL antes de comida',
      },
      {
        nombreEstado: 'Alto Preprandial',
        descripcionEstado: 'Glucosa 131–180 mg/dL antes de comida',
      },
      {
        nombreEstado: 'Hiperglucemia Preprandial',
        descripcionEstado: 'Glucosa 181–399 mg/dL antes de comida',
      },
      {
        nombreEstado: 'Hiperglucemia Critica Preprandial',
        descripcionEstado: 'Glucosa ≥400 mg/dL antes de comida',
      },

      // 🔹 Postprandial
      {
        nombreEstado: 'Hipoglucemia Critica Postprandial',
        descripcionEstado: 'Glucosa <54 mg/dL después de comida',
      },
      {
        nombreEstado: 'Hipoglucemia Postprandial',
        descripcionEstado: 'Glucosa 54–69 mg/dL después de comida',
      },
      {
        nombreEstado: 'Bajo Postprandial',
        descripcionEstado: 'Glucosa 70–79 mg/dL después de comida',
      },
      {
        nombreEstado: 'Óptimo Postprandial',
        descripcionEstado: 'Glucosa 80–180 mg/dL después de comida',
      },
      {
        nombreEstado: 'Alto Postprandial',
        descripcionEstado: 'Glucosa 181–250 mg/dL después de comida',
      },
      {
        nombreEstado: 'Hiperglucemia Postprandial',
        descripcionEstado: 'Glucosa 251–399 mg/dL después de comida',
      },
      {
        nombreEstado: 'Hiperglucemia Critica Postprandial',
        descripcionEstado: 'Glucosa ≥400 mg/dL después de comida',
      },

      // 🔹 Otros momentos
      {
        nombreEstado: 'Hipoglucemia Critica',
        descripcionEstado: 'Glucosa <54 mg/dL en otro momento',
      },
      {
        nombreEstado: 'Hipoglucemia',
        descripcionEstado: 'Glucosa 54–69 mg/dL en otro momento',
      },
      {
        nombreEstado: 'Bajo',
        descripcionEstado: 'Glucosa 70–79 mg/dL en otro momento',
      },
      {
        nombreEstado: 'Óptimo',
        descripcionEstado: 'Glucosa 80–130 mg/dL en otro momento',
      },
      {
        nombreEstado: 'Alto',
        descripcionEstado: 'Glucosa 131–180 mg/dL en otro momento',
      },
      {
        nombreEstado: 'Hiperglucemia',
        descripcionEstado: 'Glucosa 181–399 mg/dL en otro momento',
      },
      {
        nombreEstado: 'Hiperglucemia Critica',
        descripcionEstado: 'Glucosa ≥400 mg/dL en otro momento',
      },
    ];

    for (const estado of estados) {
      const existe = await this.estadoRepo.findOne({
        where: { nombreEstado: estado.nombreEstado },
      });

      if (!existe) {
        await this.estadoRepo.save(this.estadoRepo.create(estado));
      }
    }

    console.log('✅ Estados insertados correctamente');
  }
}
