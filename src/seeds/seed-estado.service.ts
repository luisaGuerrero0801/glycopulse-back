import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';

@Injectable()
export class EstadoSeed {
  constructor(
    @InjectRepository(EstadoGlucometria)
    private estadoRepo: Repository<EstadoGlucometria>
  ) {}

  async run() {
    const estados = [
      {
        nombreEstado: 'Óptimo Ayunas',
        descripcionEstado:
          'Valor dentro del rango recomendado en ayunas; indica buen control basal.',
      },
      {
        nombreEstado: 'Bajo Ayunas',
        descripcionEstado:
          'Valor ligeramente por debajo del rango ideal en ayunas; riesgo de descender a hipoglucemia.',
      },
      {
        nombreEstado: 'Hipoglucemia Ayunas',
        descripcionEstado:
          'Nivel peligrosamente bajo en ayunas, requiere corrección inmediata.',
      },
      {
        nombreEstado: 'Hipoglucemia Critica Ayunas',
        descripcionEstado:
          'Nivel extremadamente bajo riesgo severo, requiere atención inmediata.',
      },
      {
        nombreEstado: 'Alto Ayunas',
        descripcionEstado:
          'Valor mayor al recomendado en ayunas; indica control insuficiente.',
      },
      {
        nombreEstado: 'Hiperglucemia Ayunas',
        descripcionEstado:
          'Nivel muy alto en ayunas; puede reflejar problemas en tratamiento o alimentación previa.',
      },
      {
        nombreEstado: 'Hiperglucemia Critica Ayunas',
        descripcionEstado:
          'Nivel extremadamente alto, requiere atención médica urgente.',
      },

      // 🔹 Preprandial
      {
        nombreEstado: 'Óptimo Preprandial',
        descripcionEstado:
          'Nivel ideal antes de comer; adecuado para iniciar la ingesta.',
      },
      {
        nombreEstado: 'Bajo Preprandial',
        descripcionEstado:
          'Nivel cercano a hipoglucemia previo a la comida; puede requerir ajuste en la ingesta.',
      },
      {
        nombreEstado: 'Hipoglucemia Crítica Preprandial',
        descripcionEstado:
          'Nivel extremadamente bajo riesgo severo, requiere atención inmediata.',
      },
      {
        nombreEstado: 'Hipoglucemia Preprandial',
        descripcionEstado:
          'Nivel bajo antes de comer; requiere acción inmediata.',
      },
      {
        nombreEstado: 'Alto Preprandial',
        descripcionEstado:
          'Nivel elevado antes de comer; indica descontrol glucémico.',
      },
      {
        nombreEstado: 'Hiperglucemia Preprandial',
        descripcionEstado:
          'Nivel muy alto previo a comida; riesgo de complicaciones agudas.',
      },
      {
        nombreEstado: 'Hiperglucemia Critica Preprandial',
        descripcionEstado:
          'Nivel extremadamente alto, requiere atención médica urgente.',
      },

      // 🔹 Postprandial
      {
        nombreEstado: 'Óptimo Postprandial',
        descripcionEstado:
          'Nivel adecuado después de comer; dentro de metas terapéuticas.',
      },
      {
        nombreEstado: 'Bajo Postprandial',
        descripcionEstado:
          'Nivel levemente bajo tras la comida; indica posible exceso de medicación o insuficiente ingesta.',
      },
      {
        nombreEstado: 'Hipoglucemia Postprandial',
        descripcionEstado:
          'Descenso marcado tras la comida; requiere corrección inmediata.',
      },
      {
        nombreEstado: 'Hipoglucemia Crítica Postprandial',
        descripcionEstado:
          'Nivel extremadamente bajo riesgo severo, requiere atención inmediata.',
      },
      {
        nombreEstado: 'Alto Postprandial',
        descripcionEstado:
          'Nivel mayor al recomendado tras comer; puede deberse a exceso de carbohidratos o poca insulina.',
      },
      {
        nombreEstado: 'Hiperglucemia Postprandial',
        descripcionEstado:
          'Nivel muy alto tras la comida; situación de alto riesgo.',
      },
      {
        nombreEstado: 'Hiperglucemia Critica Postprandial',
        descripcionEstado:
          'Nivel extremadamente alto, requiere atención médica urgente.',
      },

      // 🔹 Otros momentos (antes de dormir, madrugada, etc.)
      {
        nombreEstado: 'Óptimo',
        descripcionEstado:
          'Valor dentro del rango recomendado en controles nocturnos o intermedios.',
      },
      {
        nombreEstado: 'Bajo',
        descripcionEstado:
          'Nivel cercano a hipoglucemia fuera de comidas; requiere vigilancia.',
      },
      {
        nombreEstado: 'Hipoglucemia',
        descripcionEstado:
          'Nivel bajo fuera de las comidas; puede ser peligroso durante la noche.',
      },
      {
        nombreEstado: 'Hipoglucemia Crítica',
        descripcionEstado:
          'Nivel extremadamente bajo riesgo severo, requiere atención inmediata.',
      },
      {
        nombreEstado: 'Alto',
        descripcionEstado:
          'Nivel por encima del ideal en horarios distintos a comidas o ayunas.',
      },
      {
        nombreEstado: 'Hiperglucemia',
        descripcionEstado:
          'Nivel muy alto fuera de comidas; requiere atención médica si persiste.',
      },
      {
        nombreEstado: 'Hiperglucemia Critica',
        descripcionEstado:
          'Nivel extremadamente alto, requiere atención médica urgente.',
      },
    ];

    for (const estado of estados) {
      const exists = await this.estadoRepo.findOne({
        where: { nombreEstado: estado.nombreEstado },
      });
      if (!exists) await this.estadoRepo.save(this.estadoRepo.create(estado));
    }

    console.log('✅ Estados insertados');
  }
}
