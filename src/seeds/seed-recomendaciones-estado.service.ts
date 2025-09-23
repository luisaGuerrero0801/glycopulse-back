import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { RecomendacionesGlucometria } from 'src/recomendaciones-glucometria/entities/recomendaciones-glucometria.entity';
import { RecomendacionesEstado } from 'src/recomendaciones-estado/entities/recomendaciones-estado.entity';

@Injectable()
export class RecomendacionEstadoSeed {
  constructor(
    @InjectRepository(RecomendacionesEstado)
    private readonly recEstadoRepo: Repository<RecomendacionesEstado>,
    @InjectRepository(EstadoGlucometria)
    private readonly estadoRepo: Repository<EstadoGlucometria>,
    @InjectRepository(RecomendacionesGlucometria)
    private readonly recRepo: Repository<RecomendacionesGlucometria>
  ) {}

  async run() {
    const estados = await this.estadoRepo.find();
    const recomendaciones = await this.recRepo.find();

    // 🔹 Asociaciones: estado.nombreEstado → recomendaciones que le corresponden
    const asociaciones: Record<string, string[]> = {
      // 🔴 AYUNAS
      'Hipoglucemia Crítica Ayunas': [
        'Un nivel de glucosa en ayunas por debajo de 54 mg/dL indica hipoglucemia severa y peligrosa. Requiere atención inmediata.',
        'Consume carbohidratos de absorción rápida como jugo o glucosa en gel.',
        'Evita totalmente la actividad física.',
        'Bebe agua solo después de estabilizarte.',
        'Repite la medición y acude a urgencias si no mejora.',
      ],
      'Hipoglucemia Ayunas': [
        'Un valor de glucosa en ayunas entre 54 y 69 mg/dL indica hipoglucemia leve. Debe tratarse rápidamente.',
        'Ingiere 15 g de carbohidratos rápidos (ej. jugo, caramelos, glucosa) y luego desayuna completo.',
        'No realices ejercicio hasta normalizar los niveles.',
        'Agua simple tras la estabilización.',
        'Vuelve a medir en 15 minutos; si no mejora, busca atención médica.',
      ],
      'Bajo Ayunas': [
        'Un nivel en ayunas entre 70 y 79 mg/dL está cercano al límite bajo y requiere atención preventiva.',
        'Incluye fruta o pan integral en el desayuno para estabilizar.',
        'Come algo antes de realizar actividad física.',
        'Bebe agua al despertar para favorecer el equilibrio.',
        'Monitorea la frecuencia; consulta si se repite.',
      ],
      'Óptimo Ayunas': [
        'Un nivel en ayunas dentro de 80–130 mg/dL refleja un buen control basal.',
        'Desayuna con proteínas y carbohidratos complejos (ej. avena, huevo).',
        'Evita ejercicio intenso antes de comer; actividad ligera está bien.',
        'Agua al despertar y a lo largo del día.',
        'Registra y compara con días previos para detectar tendencias.',
      ],
      'Alto Ayunas': [
        'Un valor en ayunas de 131–180 mg/dL está por encima del rango recomendado.',
        'Reduce carbohidratos simples en la cena previa y prioriza fibra.',
        'Realiza una caminata ligera tras la cena si es seguro.',
        'Mantén hidratación adecuada antes de dormir y al despertar.',
        'Vigila si es un patrón recurrente y consulta al equipo de salud.',
      ],
      'Hiperglucemia Ayunas': [
        'Una glucosa en ayunas mayor a 180 mg/dL indica mal control nocturno.',
        'Evita carbohidratos simples en la cena y distribuye carbohidratos en porciones controladas.',
        'Actividad ligera tras la cena (si no hay contraindicación).',
        'Agua antes de dormir y al despertar; evita bebidas azucaradas.',
        'Si persiste varios días, consulta al profesional que te atiende.',
      ],
      'Hiperglucemia Crítica Ayunas': [
        'Un valor mayor a 400 mg/dL en ayunas es una urgencia médica.',
        'No comer hasta recibir orientación médica; evita carbohidratos.',
        'Evitar ejercicio hasta evaluación médica.',
        'Mantener hidratación con agua si no hay contraindicación.',
        'Acude a urgencias; puede requerir tratamiento urgente.',
      ],

      // 🟠 PREPRANDIAL
      'Hipoglucemia Crítica Preprandial': [
        'Un nivel por debajo de 54 mg/dL antes de comer indica riesgo grave de hipoglucemia severa.',
        'Consume carbohidratos de absorción rápida antes de ingerir la comida principal.',
        'Evita esfuerzo físico hasta normalizar la glucemia.',
        'Hidratación tras la recuperación.',
        'Si no mejora tras 15 minutos, busca atención médica inmediata.',
      ],
      'Hipoglucemia Preprandial': [
        'Un nivel de 54–69 mg/dL antes de comer es hipoglucemia leve.',
        'Ingiere 15 g de carbohidratos de acción rápida antes de comer.',
        'Suspende ejercicio hasta corregir niveles.',
        'Agua simple tras la estabilización.',
        'Mide de nuevo antes de iniciar la comida.',
      ],
      'Bajo Preprandial': [
        'Un rango de 70–79 mg/dL previo a la comida está en el límite bajo.',
        'Incluye fruta o cereal integral en tu comida.',
        'Ten precaución con la actividad física previa.',
        'Agua para acompañar la comida.',
        'Monitorea la frecuencia de valores bajos antes de comer.',
      ],
      'Óptimo Preprandial': [
        'Un nivel entre 80–130 mg/dL antes de comer es adecuado.',
        'Comida equilibrada con proteínas y carbohidratos complejos.',
        'Puedes realizar actividad ligera antes de la comida.',
        'Agua antes y durante la comida.',
        'Registra valores para control de evolución.',
      ],
      'Alto Preprandial': [
        'Un valor entre 131–180 mg/dL previo a la comida está elevado.',
        'Disminuye alimentos con carbohidratos simples en la siguiente comida.',
        'Actividad ligera como caminata antes de comer.',
        'Hidratación abundante antes y durante la comida.',
        'Evalúa si este patrón es recurrente.',
      ],
      'Hiperglucemia Preprandial': [
        'Mayor a 180 mg/dL antes de la comida indica hiperglucemia significativa.',
        'Reduce carbohidratos simples y prefiere ensaladas y proteína.',
        'Caminar 10–15 minutos previo a comer puede ayudar.',
        'Agua simple; evita bebidas azucaradas.',
        'Si se repite frecuentemente, consulta al especialista.',
      ],
      'Hiperglucemia Crítica Preprandial': [
        'Un valor mayor a 400 mg/dL antes de la comida es crítico.',
        'No iniciar la comida hasta recibir orientación médica.',
        'No realizar ejercicio físico.',
        'Mantén hidratación con agua mientras recibes atención.',
        'Acudir de inmediato a urgencias.',
      ],

      // 🟡 POSTPRANDIAL
      'Hipoglucemia Crítica Postprandial': [
        'Un nivel menor a 54 mg/dL después de comer es muy grave.',
        'Ingerir carbohidratos de absorción rápida aunque ya hayas comido.',
        'Evita toda actividad física.',
        'Agua tras estabilizar niveles.',
        'Acude a urgencias si no mejora.',
      ],
      'Hipoglucemia Postprandial': [
        'Un valor entre 54–69 mg/dL tras la comida es bajo.',
        'Añade carbohidratos rápidos extra.',
        'Evita ejercicio físico tras la comida.',
        'Bebe agua al estabilizarte.',
        'Monitorea evolución cada 15 minutos.',
      ],
      'Bajo Postprandial': [
        'Un nivel entre 70–79 mg/dL después de comer es bajo.',
        'Añade un pequeño snack saludable.',
        'Precaución con actividad física posterior.',
        'Agua para mantener equilibrio.',
        'Consulta si se repite con frecuencia.',
      ],
      'Óptimo Postprandial': [
        'Un rango de 80–140 mg/dL después de comer es adecuado.',
        'Alimentos balanceados en siguientes comidas.',
        'Caminata ligera puede ser beneficiosa.',
        'Agua tras la comida.',
        'Registra valores para control personal.',
      ],
      'Alto Postprandial': [
        'Un nivel entre 141–199 mg/dL tras comer es elevado.',
        'Reduce porciones de carbohidratos simples en próximas comidas.',
        'Realiza actividad ligera postcomida.',
        'Hidratación adecuada después de comer.',
        'Vigilar tendencia; si es frecuente, ajustar plan alimenticio.',
      ],
      'Hiperglucemia Postprandial': [
        'Un valor mayor a 200 mg/dL después de comer indica hiperglucemia.',
        'Limitar carbohidratos simples; preferir vegetales y proteínas.',
        'Caminata de 15 minutos tras la comida puede ayudar.',
        'Agua sin azúcar tras la comida.',
        'Consultar con especialista si es repetitivo.',
      ],
      'Hiperglucemia Crítica Postprandial': [
        'Un nivel mayor a 400 mg/dL tras la comida es una urgencia.',
        'No ingerir más comida hasta estabilizarte.',
        'Suspender toda actividad física.',
        'Solo agua mientras recibes atención.',
        'Acude inmediatamente a urgencias.',
      ],

      // 🌙 OTROS (Ayuno nocturno, antes de dormir, madrugada)
      'Hipoglucemia Crítica Otros': [
        'Un valor menor a 54 mg/dL en la madrugada o antes de dormir es muy grave.',
        'Consumir carbohidratos de absorción rápida.',
        'Evita dormir hasta que se normalice.',
        'Agua después de estabilizarte.',
        'Busca atención urgente si no mejora.',
      ],
      'Hipoglucemia Otros': [
        'Un rango de 54–69 mg/dL durante la noche es bajo.',
        'Consumir carbohidratos rápidos como jugo o galletas.',
        'No realizar actividad física nocturna.',
        'Agua simple tras estabilización.',
        'Revisar de nuevo en 15 minutos.',
      ],
      'Bajo Otros': [
        'Un nivel de 70–79 mg/dL en la madrugada es bajo.',
        'Snack ligero con carbohidratos complejos antes de dormir.',
        'Precaución si haces actividad física nocturna.',
        'Mantener hidratación antes de dormir.',
        'Consulta si el patrón se repite.',
      ],
      'Óptimo Otros': [
        'Un nivel entre 80–130 mg/dL en la noche es adecuado.',
        'Cena balanceada antes de dormir.',
        'Actividad ligera antes de acostarse está bien.',
        'Agua antes de dormir.',
        'Registrar evolución de niveles nocturnos.',
      ],
      'Alto Otros': [
        'Un valor entre 131–180 mg/dL antes de dormir es elevado.',
        'Evita carbohidratos simples en la cena.',
        'Caminar tras la cena puede ayudar.',
        'Mantén hidratación con agua.',
        'Consulta si los valores son frecuentes.',
      ],
      'Hiperglucemia Otros': [
        'Un nivel mayor a 180 mg/dL en la madrugada o al dormir indica mal control.',
        'Evita comidas nocturnas con azúcar.',
        'Actividad ligera después de la cena puede ayudar.',
        'Agua sin azúcar antes de dormir.',
        'Si ocurre seguido, acudir al médico.',
      ],
      'Hiperglucemia Crítica Otros': [
        'Un valor mayor a 400 mg/dL en la noche es crítico.',
        'No ingerir más comida.',
        'No realizar actividad física.',
        'Mantén hidratación solo con agua.',
        'Acude a urgencias de inmediato.',
      ],
    };

    for (const [nombreEstado, textos] of Object.entries(asociaciones)) {
      const estado = estados.find((e) => e.nombreEstado === nombreEstado);
      if (!estado) continue;

      for (const texto of textos) {
        const recomendacion = recomendaciones.find(
          (r) => r.descripcionRecomendacion === texto
        );
        if (!recomendacion) continue;

        const existe = await this.recEstadoRepo.findOne({
          where: {
            estado: { idEstado: estado.idEstado },
            recomendacion: { idRecomendacion: recomendacion.idRecomendacion },
          },
        });

        if (!existe) {
          await this.recEstadoRepo.save(
            this.recEstadoRepo.create({ estado, recomendacion })
          );
        }
      }
    }

    console.log('✅ Asociaciones Estado ↔ Recomendaciones insertadas');
  }
}
