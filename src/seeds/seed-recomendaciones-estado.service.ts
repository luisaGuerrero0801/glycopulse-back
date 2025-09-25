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

      'Hipoglucemia Critica Ayunas': [
        'Un nivel de glucosa en ayunas por debajo de 54 mg/dL indica una hipoglucemia severa y peligrosa. Si el objetivo es mantener estabilidad, este rango requiere corrección inmediata y atención médica.',
        'Consume carbohidratos de absorción rápida como jugo o glucosa en gel.',
        'Evita totalmente la actividad física.',
        'Bebe agua solo después de estabilizarte.',
        'Repite la medición y acude a urgencias si no mejora.',
      ],
      'Hipoglucemia Ayunas': [
        'Un valor de glucosa en ayunas entre 55 y 69 mg/dL indica hipoglucemia leve. Debe corregirse inmediatamente para evitar síntomas.',
        'Ingiere 15 g de carbohidratos rápidos (ej. jugo, caramelos, glucosa) y luego desayuna completo.',
        'No realices ejercicio hasta normalizar los niveles.',
        'Agua simple tras la estabilización.',
        'Vuelve a medir en 15 minutos; si no mejora, busca atención médica.',
      ],
      'Bajo Ayunas': [
        'Un nivel en ayunas entre 70 y 79 mg/dL está cercano al límite bajo. El objetivo es prevenir descensos hacia hipoglucemia.',
        'Incluye fruta o pan integral en el desayuno para estabilizar.',
        'Come algo antes de realizar actividad física.',
        'Bebe agua al despertar para favorecer el equilibrio.',
        'Monitorea la frecuencia; consulta si se repite.',
      ],
      'Óptimo Ayunas': [
        'Un nivel en ayunas dentro de 80–130 mg/dL refleja un buen control basal. Mantener hábitos para estabilidad.',
        'Desayuna con proteínas y carbohidratos complejos (ej. avena, huevo).',
        'Evita ejercicio intenso antes de comer; actividad ligera está bien.',
        'Agua al despertar y a lo largo del día.',
        'Registra y compara con días previos para detectar tendencias.',
      ],
      'Alto Ayunas': [
        'Un valor en ayunas de 131–180 mg/dL está por encima del rango recomendado y sugiere ajuste de hábitos o tratamiento.',
        'Reduce carbohidratos simples en la cena previa y prioriza fibra.',
        'Realiza una caminata ligera tras la cena si es seguro.',
        'Mantén hidratación adecuada antes de dormir y al despertar.',
        'Vigila si es un patrón recurrente y consulta al equipo de salud.',
      ],
      'Hiperglucemia Ayunas': [
        'Una glucosa en ayunas entre 181 y 399 mg/dL indica mal control nocturno; requiere revisión de dieta o medicación.',
        'Evita carbohidratos simples en la cena y distribuye carbohidratos en porciones controladas.',
        'Actividad ligera tras la cena (si no hay contraindicación).',
        'Agua antes de dormir y al despertar; evita bebidas azucaradas.',
        'Si persiste varios días, consulta al profesional que te atiende.',
      ],
      'Hiperglucemia Critica Ayunas': [
        'Un valor mayor o igual a 400 mg/dL en ayunas es una urgencia médica. Requiere evaluación inmediata.',
        'No comer hasta recibir orientación médica; evita carbohidratos.',
        'Evitar ejercicio hasta evaluación médica.',
        'Mantener hidratación con agua si no hay contraindicación; vigilar signos de deshidratación.',
        'Acude a urgencias; puede requerir tratamiento urgente.',
      ],

      // 🔹 PREPRANDIAL
      'Hipoglucemia Critica Preprandial': [
        'Un nivel de glucosa menor a 54 mg/dL antes de comer indica hipoglucemia grave. Requiere corrección inmediata.',
        'Consume carbohidratos rápidos antes de la comida (ej. jugo, glucosa en gel).',
        'Evita actividad física hasta normalizar.',
        'Agua tras estabilizar niveles.',
        'Repite la medición y busca ayuda si no mejora.',
      ],
      'Hipoglucemia Preprandial': [
        'Una glucosa de 55–69 mg/dL antes de comer es hipoglucemia leve; corrígela antes de iniciar la comida.',
        'Carbohidratos rápidos y luego la comida habitual con balance de proteínas y fibra.',
        'No hacer ejercicio previo a la corrección.',
        'Agua después de normalizar.',
        'Monitorea la recurrencia y consulta si es frecuente.',
      ],
      'Bajo Preprandial': [
        'Un nivel de 70–79 mg/dL antes de comer está cercano a hipoglucemia; iniciar la comida pronto.',
        'Comienza con carbohidratos complejos para estabilizar.',
        'No realizar ejercicio en ayunas; comer antes de la actividad.',
        'Beber agua antes de comer.',
        'Mide después de la comida para verificar respuesta.',
      ],
      'Óptimo Preprandial': [
        'Glucosa 80–130 mg/dL antes de comer refleja buen control; objetivo mantener estabilidad tras ingesta.',
        'Balancea la comida con fibra, proteínas y carbohidratos controlados.',
        'Ejercicio ligero después de comer es recomendable.',
        'Agua antes de la comida para buena digestión y control glucémico.',
        'Registrar para comparar respuesta postprandial.',
      ],
      'Alto Preprandial': [
        'Valor de 131–180 mg/dL antes de comer indica elevación; ajustar porciones y composición de la comida.',
        'Reducir porción de carbohidratos y priorizar vegetales y proteínas.',
        'Realizar actividad suave tras la comida si es seguro.',
        'Hidratarse antes y después de la comida.',
        'Vigila tendencias y ajuste terapéutico si persiste.',
      ],
      'Hiperglucemia Preprandial': [
        'Una glucosa entre 181 y 399 mg/dL antes de comer indica hiperglucemia; requiere revisión de medicación/dieta.',
        'Evitar azúcares y alimentos con índice glucémico alto en la comida siguiente.',
        'Ejercicio suave solo si no hay contraindicaciones y no hay cetonas.',
        'Beber agua; evitar bebidas azucaradas.',
        'Consultar al equipo de salud si es persistente.',
      ],
      'Hiperglucemia Critica Preprandial': [
        'Glucosa mayor o igual a 400 mg/dL antes de comer es crítica. Requiere atención médica urgente.',
        'No comer hasta recibir indicaciones médicas.',
        'Evitar ejercicio; puede empeorar la situación.',
        'Hidratar con agua si es posible; vigilar signos de descompensación.',
        'Acude a urgencias de manera inmediata para evaluación y tratamiento.',
      ],

      // 🔹 POSTPRANDIAL
      'Hipoglucemia Critica Postprandial': [
        'Nivel <54 mg/dL tras comer indica hipoglucemia severa; puede deberse a exceso de medicación. Requiere corrección inmediata.',
        'Toma carbohidratos de acción rápida y un snack ligero (ej. yogurt, pan).',
        'Suspende ejercicio inmediatamente.',
        'Beber agua tras estabilizarte.',
        'Si no mejora, busca ayuda médica; revisa esquema terapéutico.',
      ],
      'Hipoglucemia Postprandial': [
        'Glucosa 55–69 mg/dL tras la comida indica hipoglucemia leve; corrige y observa.',
        'Carbohidratos rápidos y luego una proteína ligera.',
        'Evita actividad física inmediata.',
        'Agua tras estabilizar.',
        'Monitorea recurrencia; revisa dosis si es frecuente.',
      ],
      'Bajo Postprandial': [
        'Nivel 70–79 mg/dL tras comer en límite bajo; ajustar composición de comidas para evitar descensos.',
        'Incorpora más carbohidratos complejos y proteína en comidas.',
        'Evita ejercicio inmediato; espera a estabilizarte.',
        'Mantén hidratación con agua.',
        'Vigila y registra si ocurre con frecuencia.',
      ],
      'Óptimo Postprandial': [
        'Glucosa <180 mg/dL tras comer refleja buen control postprandial; mantener porciones y actividad leve.',
        'Mantén porciones moderadas y fibra para controlar el pico glucémico.',
        'Caminata ligera (10–20 min) ayuda a controlar el pico.',
        'Agua durante y después de la comida.',
        'Registra valores postprandiales para comparar con objetivos.',
      ],
      'Alto Postprandial': [
        'Glucosa 180–250 mg/dL tras comer está elevada; revisar composición de la comida y el manejo.',
        'Reducir azúcares y harinas refinadas; aumentar fibra y proteína.',
        'Realizar caminata de 10–20 minutos después de comer si es seguro.',
        'Hidratarse con agua; evitar bebidas azucaradas.',
        'Registrar y consultar si se repite como patrón.',
      ],
      'Hiperglucemia Postprandial': [
        'Glucosa >250 mg/dL tras la comida es muy alta; requiere medidas para evitar complicaciones.',
        'Evitar postres y bebidas azucaradas; optar por proteína y verdura.',
        'Ejercicio suave solo si no hay cetonas y está indicado por tu médico.',
        'Agua abundante si no hay contraindicación.',
        'Consulta médica si persiste o aumenta.',
      ],
      'Hiperglucemia Critica Postprandial': [
        'Glucosa postprandial >400 mg/dL es crítica; debe evaluarse de inmediato.',
        'No ingerir más alimentos hasta recibir indicaciones.',
        'Evitar ejercicio; acude a urgencias si hay síntomas severos.',
        'Hidratación con agua si la toleras; vigila signos de deshidratación.',
        'Acude a urgencias para evaluación y tratamiento.',
      ],

      // 🔹 OTROS MOMENTOS (CORREGIDO - sin "Otros" en el nombre)
      'Hipoglucemia Critica': [
        'Nivel <54 mg/dL fuera de comidas es hipoglucemia severa y peligrosa; atención inmediata.',
        'Consume carbohidratos de rápida absorción (jugo, glucosa) y espera estabilizar.',
        'Suspende cualquier actividad física hasta normalizar.',
        'Beber agua solo después de estabilizarte.',
        'Mide y acude a urgencias si no mejora.',
      ],
      // eslint-disable-next-line prettier/prettier
      'Hipoglucemia': [
        'Valor 54–69 mg/dL fuera de comidas indica hipoglucemia leve; corregir para evitar síntomas.',
        'Ingiere 15 g de carbohidratos rápidos y luego un snack proteico si es necesario.',
        'Evitar actividad intensa hasta normalizar.',
        'Agua tras la corrección.',
        'Mide de nuevo en 15 minutos.',
      ],
      // eslint-disable-next-line prettier/prettier
      'Bajo': [
        'Nivel 70–79 mg/dL fuera de comidas está cercano al límite; prevenir descenso a hipoglucemia.',
        'Incluye un snack con carbohidratos complejos y proteína si vas a estar activo.',
        'Come algo antes de actividad prolongada o intensa.',
        'Mantén hidratación con agua de manera moderada.',
        'Monitorea y consulta si se repite con frecuencia nocturna.',
      ],
      // eslint-disable-next-line prettier/prettier
      'Óptimo': [
        'Valor 80–130 mg/dL en controles intermedios indica buen control; mantén hábitos saludables.',
        'Mantén comidas y snacks balanceados según horario y actividad.',
        'Actividad regular moderada ayuda a mantener estabilidad.',
        'Hidratarse a lo largo del día; evita bebidas azucaradas.',
        'Registra valores y compáralos por horarios para detectar patrones.',
      ],
      // eslint-disable-next-line prettier/prettier
      'Alto': [
        'Valor 131–180 mg/dL fuera de comidas indica elevación; revisar alimentación previa y medicación.',
        'Evitar meriendas altas en carbohidratos simples.',
        'Actividad ligera puede ayudar si está indicado.',
        'Mantener hidratación; vigilar si hay sed excesiva.',
        'Registrar y comentar con el equipo de salud si es frecuente.',
      ],
      // eslint-disable-next-line prettier/prettier
      'Hiperglucemia': [
        'Valor >180 mg/dL fuera de comidas indica mal control; requiere ajuste y seguimiento.',
        'Evitar snacks azucarados; priorizar opciones con fibra y proteína.',
        'Ejercicio suave si no hay contraindicación y no hay cetonas.',
        'Beber agua frecuentemente; evitar bebidas azucaradas.',
        'Consultar al profesional si persiste varios días.',
      ],
      'Hiperglucemia Critica': [
        'Nivel >400 mg/dL fuera de comidas es crítico. Requiere evaluación urgente.',
        'No ingerir alimentos hasta recibir indicaciones médicas.',
        'Evitar ejercicio; acudir a urgencias.',
        'Hidratación con agua si es posible; vigilar signos de descompensación.',
        'Acude a urgencias de forma inmediata.',
      ],
    };

    let contadorAsociaciones = 0;
    let contadorNoEncontradas = 0;

    for (const [nombreEstado, textos] of Object.entries(asociaciones)) {
      const estado = estados.find((e) => e.nombreEstado === nombreEstado);

      if (!estado) {
        console.log(`❌ No se encontró el estado: "${nombreEstado}"`);
        continue;
      }

      for (const texto of textos) {
        const recomendacion = recomendaciones.find(
          (r) => r.descripcionRecomendacion === texto
        );

        if (!recomendacion) {
          console.log(
            `❌ No se encontró recomendación para: "${texto.substring(0, 50)}..."`
          );
          contadorNoEncontradas++;
          continue;
        }

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
          contadorAsociaciones++;
        }
      }
    }

    console.log(
      `✅ ${contadorAsociaciones} asociaciones Estado ↔ Recomendaciones insertadas`
    );
    if (contadorNoEncontradas > 0) {
      console.log(
        `⚠️  ${contadorNoEncontradas} recomendaciones no encontradas`
      );
    }
  }
}
