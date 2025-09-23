import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecomendacionesGlucometria } from 'src/recomendaciones-glucometria/entities/recomendaciones-glucometria.entity';

@Injectable()
export class RecomendacionSeed {
  constructor(
    @InjectRepository(RecomendacionesGlucometria)
    private readonly recomendacionRepo: Repository<RecomendacionesGlucometria>
  ) {}

  async run() {
    const recomendaciones = [
      // 🔹 AYUNAS
      // 2 Critica Ayunas (0–54)
      {
        estado: 'Hipoglucemia Critica Ayunas',
        tipo: 'General',
        contenido:
          'Un nivel de glucosa en ayunas por debajo de 54 mg/dL indica una hipoglucemia severa y peligrosa. Si el objetivo es mantener estabilidad, este rango requiere corrección inmediata y atención médica.',
      },
      {
        estado: 'Hipoglucemia Critica Ayunas',
        tipo: 'Alimentaria',
        contenido:
          'Consume carbohidratos de absorción rápida como jugo o glucosa en gel.',
      },
      {
        estado: 'Hipoglucemia Critica Ayunas',
        tipo: 'Actividad física',
        contenido: 'Evita totalmente la actividad física.',
      },
      {
        estado: 'Hipoglucemia Critica Ayunas',
        tipo: 'Hidratación',
        contenido: 'Bebe agua solo después de estabilizarte.',
      },
      {
        estado: 'Hipoglucemia Critica Ayunas',
        tipo: 'Control continuo',
        contenido: 'Repite la medición y acude a urgencias si no mejora.',
      },
      // 2 Hipoglucemia Ayunas (55–69)
      {
        estado: 'Hipoglucemia Ayunas',
        tipo: 'General',
        contenido:
          'Un valor de glucosa en ayunas entre 54 y 69 mg/dL indica hipoglucemia leve. Debe corregirse inmediatamente para evitar síntomas.',
      },
      {
        estado: 'Hipoglucemia Ayunas',
        tipo: 'Alimentaria',
        contenido:
          'Ingiere 15 g de carbohidratos rápidos (ej. jugo, caramelos, glucosa) y luego desayuna completo.',
      },
      {
        estado: 'Hipoglucemia Ayunas',
        tipo: 'Actividad física',
        contenido: 'No realices ejercicio hasta normalizar los niveles.',
      },
      {
        estado: 'Hipoglucemia Ayunas',
        tipo: 'Hidratación',
        contenido: 'Agua simple tras la estabilización.',
      },
      {
        estado: 'Hipoglucemia Ayunas',
        tipo: 'Control continuo',
        contenido:
          'Vuelve a medir en 15 minutos; si no mejora, busca atención médica.',
      },

      // 3 Bajo Ayunas (70–79)
      {
        estado: 'Bajo Ayunas',
        tipo: 'General',
        contenido:
          'Un nivel en ayunas entre 70 y 79 mg/dL está cercano al límite bajo. El objetivo es prevenir descensos hacia hipoglucemia.',
      },
      {
        estado: 'Bajo Ayunas',
        tipo: 'Alimentaria',
        contenido:
          'Incluye fruta o pan integral en el desayuno para estabilizar.',
      },
      {
        estado: 'Bajo Ayunas',
        tipo: 'Actividad física',
        contenido: 'Come algo antes de realizar actividad física.',
      },
      {
        estado: 'Bajo Ayunas',
        tipo: 'Hidratación',
        contenido: 'Bebe agua al despertar para favorecer el equilibrio.',
      },
      {
        estado: 'Bajo Ayunas',
        tipo: 'Control continuo',
        contenido: 'Monitorea la frecuencia; consulta si se repite.',
      },

      // 4 Óptimo Ayunas (80–130)
      {
        estado: 'Óptimo Ayunas',
        tipo: 'General',
        contenido:
          'Un nivel en ayunas dentro de 80–130 mg/dL refleja un buen control basal. Mantener hábitos para estabilidad.',
      },
      {
        estado: 'Óptimo Ayunas',
        tipo: 'Alimentaria',
        contenido:
          'Desayuna con proteínas y carbohidratos complejos (ej. avena, huevo).',
      },
      {
        estado: 'Óptimo Ayunas',
        tipo: 'Actividad física',
        contenido:
          'Evita ejercicio intenso antes de comer; actividad ligera está bien.',
      },
      {
        estado: 'Óptimo Ayunas',
        tipo: 'Hidratación',
        contenido: 'Agua al despertar y a lo largo del día.',
      },
      {
        estado: 'Óptimo Ayunas',
        tipo: 'Control continuo',
        contenido:
          'Registra y compara con días previos para detectar tendencias.',
      },

      // 5 Alto Ayunas (131–180)
      {
        estado: 'Alto Ayunas',
        tipo: 'General',
        contenido:
          'Un valor en ayunas de 131–180 mg/dL está por encima del rango recomendado y sugiere ajuste de hábitos o tratamiento.',
      },
      {
        estado: 'Alto Ayunas',
        tipo: 'Alimentaria',
        contenido:
          'Reduce carbohidratos simples en la cena previa y prioriza fibra.',
      },
      {
        estado: 'Alto Ayunas',
        tipo: 'Actividad física',
        contenido: 'Realiza una caminata ligera tras la cena si es seguro.',
      },
      {
        estado: 'Alto Ayunas',
        tipo: 'Hidratación',
        contenido:
          'Mantén hidratación adecuada antes de dormir y al despertar.',
      },
      {
        estado: 'Alto Ayunas',
        tipo: 'Control continuo',
        contenido:
          'Vigila si es un patrón recurrente y consulta al equipo de salud.',
      },

      // 6 Hiperglucemia Ayunas (>180)
      {
        estado: 'Hiperglucemia Ayunas',
        tipo: 'General',
        contenido:
          'Una glucosa en ayunas mayor a 180 mg/dL indica mal control nocturno; requiere revisión de dieta o medicación.',
      },
      {
        estado: 'Hiperglucemia Ayunas',
        tipo: 'Alimentaria',
        contenido:
          'Evita carbohidratos simples en la cena y distribuye carbohidratos en porciones controladas.',
      },
      {
        estado: 'Hiperglucemia Ayunas',
        tipo: 'Actividad física',
        contenido:
          'Actividad ligera tras la cena (si no hay contraindicación).',
      },
      {
        estado: 'Hiperglucemia Ayunas',
        tipo: 'Hidratación',
        contenido:
          'Agua antes de dormir y al despertar; evita bebidas azucaradas.',
      },
      {
        estado: 'Hiperglucemia Ayunas',
        tipo: 'Control continuo',
        contenido:
          'Si persiste varios días, consulta al profesional que te atiende.',
      },

      // 7 Hiperglucemia Crítica Ayunas (>400)
      {
        estado: 'Hiperglucemia Crítica Ayunas',
        tipo: 'General',
        contenido:
          'Un valor mayor a 400 mg/dL en ayunas es una urgencia médica. Requiere evaluación inmediata.',
      },
      {
        estado: 'Hiperglucemia Crítica Ayunas',
        tipo: 'Alimentaria',
        contenido:
          'No comer hasta recibir orientación médica; evita carbohidratos.',
      },
      {
        estado: 'Hiperglucemia Crítica Ayunas',
        tipo: 'Actividad física',
        contenido: 'Evitar ejercicio hasta evaluación médica.',
      },
      {
        estado: 'Hiperglucemia Crítica Ayunas',
        tipo: 'Hidratación',
        contenido:
          'Mantener hidratación con agua si no hay contraindicación; vigilar signos de deshidratación.',
      },
      {
        estado: 'Hiperglucemia Crítica Ayunas',
        tipo: 'Control continuo',
        contenido: 'Acude a urgencias; puede requerir tratamiento urgente.',
      },

      // ---------- PREPRANDIAL (7 estados × 5 tipos = 35)
      // 8 Hipoglucemia Crítica Preprandial
      {
        estado: 'Hipoglucemia Crítica Preprandial',
        tipo: 'General',
        contenido:
          'Un nivel de glucosa menor a 54 mg/dL antes de comer indica hipoglucemia grave. Requiere corrección inmediata.',
      },
      {
        estado: 'Hipoglucemia Crítica Preprandial',
        tipo: 'Alimentaria',
        contenido:
          'Consume carbohidratos rápidos antes de la comida (ej. jugo, glucosa en gel).',
      },
      {
        estado: 'Hipoglucemia Crítica Preprandial',
        tipo: 'Actividad física',
        contenido: 'Evita actividad física hasta normalizar.',
      },
      {
        estado: 'Hipoglucemia Crítica Preprandial',
        tipo: 'Hidratación',
        contenido: 'Agua tras estabilizar niveles.',
      },
      {
        estado: 'Hipoglucemia Crítica Preprandial',
        tipo: 'Control continuo',
        contenido: 'Repite la medición y busca ayuda si no mejora.',
      },

      // 9 Hipoglucemia Preprandial (54–69)
      {
        estado: 'Hipoglucemia Preprandial',
        tipo: 'General',
        contenido:
          'Una glucosa de 54–69 mg/dL antes de comer es hipoglucemia leve; corrígela antes de iniciar la comida.',
      },
      {
        estado: 'Hipoglucemia Preprandial',
        tipo: 'Alimentaria',
        contenido:
          'Carbohidratos rápidos y luego la comida habitual con balance de proteínas y fibra.',
      },
      {
        estado: 'Hipoglucemia Preprandial',
        tipo: 'Actividad física',
        contenido: 'No hacer ejercicio previo a la corrección.',
      },
      {
        estado: 'Hipoglucemia Preprandial',
        tipo: 'Hidratación',
        contenido: 'Agua después de normalizar.',
      },
      {
        estado: 'Hipoglucemia Preprandial',
        tipo: 'Control continuo',
        contenido: 'Monitorea la recurrencia y consulta si es frecuente.',
      },

      // 10 Bajo Preprandial (70–79)
      {
        estado: 'Bajo Preprandial',
        tipo: 'General',
        contenido:
          'Un nivel de 70–79 mg/dL antes de comer está cercano a hipoglucemia; iniciar la comida pronto.',
      },
      {
        estado: 'Bajo Preprandial',
        tipo: 'Alimentaria',
        contenido: 'Comienza con carbohidratos complejos para estabilizar.',
      },
      {
        estado: 'Bajo Preprandial',
        tipo: 'Actividad física',
        contenido:
          'No realizar ejercicio en ayunas; comer antes de la actividad.',
      },
      {
        estado: 'Bajo Preprandial',
        tipo: 'Hidratación',
        contenido: 'Beber agua antes de comer.',
      },
      {
        estado: 'Bajo Preprandial',
        tipo: 'Control continuo',
        contenido: 'Mide después de la comida para verificar respuesta.',
      },

      // 11 Óptimo Preprandial (80–130)
      {
        estado: 'Óptimo Preprandial',
        tipo: 'General',
        contenido:
          'Glucosa 80–130 mg/dL antes de comer refleja buen control; objetivo mantener estabilidad tras ingesta.',
      },
      {
        estado: 'Óptimo Preprandial',
        tipo: 'Alimentaria',
        contenido:
          'Balancea la comida con fibra, proteínas y carbohidratos controlados.',
      },
      {
        estado: 'Óptimo Preprandial',
        tipo: 'Actividad física',
        contenido: 'Ejercicio ligero después de comer es recomendable.',
      },
      {
        estado: 'Óptimo Preprandial',
        tipo: 'Hidratación',
        contenido:
          'Agua antes de la comida para buena digestión y control glucémico.',
      },
      {
        estado: 'Óptimo Preprandial',
        tipo: 'Control continuo',
        contenido: 'Registrar para comparar respuesta postprandial.',
      },

      // 12 Alto Preprandial (131–180)
      {
        estado: 'Alto Preprandial',
        tipo: 'General',
        contenido:
          'Valor de 131–180 mg/dL antes de comer indica elevación; ajustar porciones y composición de la comida.',
      },
      {
        estado: 'Alto Preprandial',
        tipo: 'Alimentaria',
        contenido:
          'Reducir porción de carbohidratos y priorizar vegetales y proteínas.',
      },
      {
        estado: 'Alto Preprandial',
        tipo: 'Actividad física',
        contenido: 'Realizar actividad suave tras la comida si es seguro.',
      },
      {
        estado: 'Alto Preprandial',
        tipo: 'Hidratación',
        contenido: 'Hidratarse antes y después de la comida.',
      },
      {
        estado: 'Alto Preprandial',
        tipo: 'Control continuo',
        contenido: 'Vigila tendencias y ajuste terapéutico si persiste.',
      },

      // 13 Hiperglucemia Preprandial (>180)
      {
        estado: 'Hiperglucemia Preprandial',
        tipo: 'General',
        contenido:
          'Una glucosa superior a 180 mg/dL antes de comer indica hiperglucemia; requiere revisión de medicación/dieta.',
      },
      {
        estado: 'Hiperglucemia Preprandial',
        tipo: 'Alimentaria',
        contenido:
          'Evitar azúcares y alimentos con índice glucémico alto en la comida siguiente.',
      },
      {
        estado: 'Hiperglucemia Preprandial',
        tipo: 'Actividad física',
        contenido:
          'Ejercicio suave solo si no hay contraindicaciones y no hay cetonas.',
      },
      {
        estado: 'Hiperglucemia Preprandial',
        tipo: 'Hidratación',
        contenido: 'Beber agua; evitar bebidas azucaradas.',
      },
      {
        estado: 'Hiperglucemia Preprandial',
        tipo: 'Control continuo',
        contenido: 'Consultar al equipo de salud si es persistente.',
      },

      // 14 Hiperglucemia Crítica Preprandial (>400)
      {
        estado: 'Hiperglucemia Crítica Preprandial',
        tipo: 'General',
        contenido:
          'Glucosa >400 mg/dL antes de comer es crítica. Requiere atención médica urgente.',
      },
      {
        estado: 'Hiperglucemia Crítica Preprandial',
        tipo: 'Alimentaria',
        contenido: 'No comer hasta recibir indicaciones médicas.',
      },
      {
        estado: 'Hiperglucemia Crítica Preprandial',
        tipo: 'Actividad física',
        contenido: 'Evitar ejercicio; puede empeorar la situación.',
      },
      {
        estado: 'Hiperglucemia Crítica Preprandial',
        tipo: 'Hidratación',
        contenido:
          'Hidratar con agua si es posible; vigilar signos de descompensación.',
      },
      {
        estado: 'Hiperglucemia Crítica Preprandial',
        tipo: 'Control continuo',
        contenido: 'Acude a urgencias para evaluación y tratamiento.',
      },

      // ---------- POSTPRANDIAL (7 estados × 5 tipos = 35)
      // 15 Hipoglucemia Crítica Postprandial
      {
        estado: 'Hipoglucemia Crítica Postprandial',
        tipo: 'General',
        contenido:
          'Nivel <54 mg/dL tras comer indica hipoglucemia severa; puede deberse a exceso de medicación. Requiere corrección inmediata.',
      },
      {
        estado: 'Hipoglucemia Crítica Postprandial',
        tipo: 'Alimentaria',
        contenido:
          'Toma carbohidratos de acción rápida y un snack ligero (ej. yogurt, pan).',
      },
      {
        estado: 'Hipoglucemia Crítica Postprandial',
        tipo: 'Actividad física',
        contenido: 'Suspende ejercicio inmediatamente.',
      },
      {
        estado: 'Hipoglucemia Crítica Postprandial',
        tipo: 'Hidratación',
        contenido: 'Beber agua tras estabilizarte.',
      },
      {
        estado: 'Hipoglucemia Crítica Postprandial',
        tipo: 'Control continuo',
        contenido:
          'Si no mejora, busca ayuda médica; revisa esquema terapéutico.',
      },

      // 16 Hipoglucemia Postprandial (54–69)
      {
        estado: 'Hipoglucemia Postprandial',
        tipo: 'General',
        contenido:
          'Glucosa 54–69 mg/dL tras la comida indica hipoglucemia leve; corrige y observa.',
      },
      {
        estado: 'Hipoglucemia Postprandial',
        tipo: 'Alimentaria',
        contenido: 'Carbohidratos rápidos y luego una proteína ligera.',
      },
      {
        estado: 'Hipoglucemia Postprandial',
        tipo: 'Actividad física',
        contenido: 'Evita actividad física inmediata.',
      },
      {
        estado: 'Hipoglucemia Postprandial',
        tipo: 'Hidratación',
        contenido: 'Agua tras estabilizar.',
      },
      {
        estado: 'Hipoglucemia Postprandial',
        tipo: 'Control continuo',
        contenido: 'Monitorea recurrencia; revisa dosis si es frecuente.',
      },

      // 17 Bajo Postprandial (70–79)
      {
        estado: 'Bajo Postprandial',
        tipo: 'General',
        contenido:
          'Nivel 70–79 mg/dL tras comer en límite bajo; ajustar composición de comidas para evitar descensos.',
      },
      {
        estado: 'Bajo Postprandial',
        tipo: 'Alimentaria',
        contenido:
          'Incorpora más carbohidratos complejos y proteína en comidas.',
      },
      {
        estado: 'Bajo Postprandial',
        tipo: 'Actividad física',
        contenido: 'Evita ejercicio inmediato; espera a estabilizarte.',
      },
      {
        estado: 'Bajo Postprandial',
        tipo: 'Hidratación',
        contenido: 'Mantén hidratación con agua.',
      },
      {
        estado: 'Bajo Postprandial',
        tipo: 'Control continuo',
        contenido: 'Vigila y registra si ocurre con frecuencia.',
      },

      // 18 Óptimo Postprandial (<180)
      {
        estado: 'Óptimo Postprandial',
        tipo: 'General',
        contenido:
          'Glucosa <180 mg/dL tras comer refleja buen control postprandial; mantener porciones y actividad leve.',
      },
      {
        estado: 'Óptimo Postprandial',
        tipo: 'Alimentaria',
        contenido:
          'Mantén porciones moderadas y fibra para controlar el pico glucémico.',
      },
      {
        estado: 'Óptimo Postprandial',
        tipo: 'Actividad física',
        contenido: 'Caminata ligera (10–20 min) ayuda a controlar el pico.',
      },
      {
        estado: 'Óptimo Postprandial',
        tipo: 'Hidratación',
        contenido: 'Agua durante y después de la comida.',
      },
      {
        estado: 'Óptimo Postprandial',
        tipo: 'Control continuo',
        contenido:
          'Registra valores postprandiales para comparar con objetivos.',
      },

      // 19 Alto Postprandial (180–250)
      {
        estado: 'Alto Postprandial',
        tipo: 'General',
        contenido:
          'Glucosa 180–250 mg/dL tras comer está elevada; revisar composición de la comida y el manejo.',
      },
      {
        estado: 'Alto Postprandial',
        tipo: 'Alimentaria',
        contenido:
          'Reducir azúcares y harinas refinadas; aumentar fibra y proteína.',
      },
      {
        estado: 'Alto Postprandial',
        tipo: 'Actividad física',
        contenido:
          'Realizar caminata de 10–20 minutos después de comer si es seguro.',
      },
      {
        estado: 'Alto Postprandial',
        tipo: 'Hidratación',
        contenido: 'Hidratarse con agua; evitar bebidas azucaradas.',
      },
      {
        estado: 'Alto Postprandial',
        tipo: 'Control continuo',
        contenido: 'Registrar y consultar si se repite como patrón.',
      },

      // 20 Hiperglucemia Postprandial (>250)
      {
        estado: 'Hiperglucemia Postprandial',
        tipo: 'General',
        contenido:
          'Glucosa >250 mg/dL tras la comida es muy alta; requiere medidas para evitar complicaciones.',
      },
      {
        estado: 'Hiperglucemia Postprandial',
        tipo: 'Alimentaria',
        contenido:
          'Evitar postres y bebidas azucaradas; optar por proteína y verdura.',
      },
      {
        estado: 'Hiperglucemia Postprandial',
        tipo: 'Actividad física',
        contenido:
          'Ejercicio suave solo si no hay cetonas y está indicado por tu médico.',
      },
      {
        estado: 'Hiperglucemia Postprandial',
        tipo: 'Hidratación',
        contenido: 'Agua abundante si no hay contraindicación.',
      },
      {
        estado: 'Hiperglucemia Postprandial',
        tipo: 'Control continuo',
        contenido: 'Consulta médica si persiste o aumenta.',
      },

      // 21 Hiperglucemia Crítica Postprandial (>400)
      {
        estado: 'Hiperglucemia Crítica Postprandial',
        tipo: 'General',
        contenido:
          'Glucosa postprandial >400 mg/dL es crítica; debe evaluarse de inmediato.',
      },
      {
        estado: 'Hiperglucemia Crítica Postprandial',
        tipo: 'Alimentaria',
        contenido: 'No ingerir más alimentos hasta recibir indicaciones.',
      },
      {
        estado: 'Hiperglucemia Crítica Postprandial',
        tipo: 'Actividad física',
        contenido:
          'Evitar ejercicio; acude a urgencias si hay síntomas severos.',
      },
      {
        estado: 'Hiperglucemia Crítica Postprandial',
        tipo: 'Hidratación',
        contenido:
          'Hidratación con agua si la toleras; vigila signos de deshidratación.',
      },
      {
        estado: 'Hiperglucemia Crítica Postprandial',
        tipo: 'Control continuo',
        contenido: 'Acude a urgencias para evaluación y tratamiento.',
      },

      // ---------- OTROS MOMENTOS (7 estados × 5 tipos = 35)
      // 22 Hipoglucemia Crítica Otros momentos
      {
        estado: 'Hipoglucemia Crítica',
        tipo: 'General',
        contenido:
          'Nivel <54 mg/dL fuera de comidas es hipoglucemia severa y peligrosa; atención inmediata.',
      },
      {
        estado: 'Hipoglucemia Crítica',
        tipo: 'Alimentaria',
        contenido:
          'Consume carbohidratos de rápida absorción (jugo, glucosa) y espera estabilizar.',
      },
      {
        estado: 'Hipoglucemia Crítica',
        tipo: 'Actividad física',
        contenido: 'Suspende cualquier actividad física hasta normalizar.',
      },
      {
        estado: 'Hipoglucemia Crítica',
        tipo: 'Hidratación',
        contenido: 'Beber agua solo después de estabilizarte.',
      },
      {
        estado: 'Hipoglucemia Crítica',
        tipo: 'Control continuo',
        contenido: 'Mide y acude a urgencias si no mejora.',
      },

      // 23 Hipoglucemia Otros momentos (55–69)
      {
        estado: 'Hipoglucemia',
        tipo: 'General',
        contenido:
          'Valor 54–69 mg/dL fuera de comidas indica hipoglucemia leve; corregir para evitar síntomas.',
      },
      {
        estado: 'Hipoglucemia',
        tipo: 'Alimentaria',
        contenido:
          'Ingiere 15 g de carbohidratos rápidos y luego un snack proteico si es necesario.',
      },
      {
        estado: 'Hipoglucemia',
        tipo: 'Actividad física',
        contenido: 'Evitar actividad intensa hasta normalizar.',
      },
      {
        estado: 'Hipoglucemia',
        tipo: 'Hidratación',
        contenido: 'Agua tras la corrección.',
      },
      {
        estado: 'Hipoglucemia',
        tipo: 'Control continuo',
        contenido: 'Mide de nuevo en 15 minutos.',
      },

      // 24 Bajo Otros momentos (70–79)
      {
        estado: 'Bajo',
        tipo: 'General',
        contenido:
          'Nivel 70–79 mg/dL fuera de comidas está cercano al límite; prevenir descenso a hipoglucemia.',
      },
      {
        estado: 'Bajo',
        tipo: 'Alimentaria',
        contenido:
          'Incluye un snack con carbohidratos complejos y proteína si vas a estar activo.',
      },
      {
        estado: 'Bajo',
        tipo: 'Actividad física',
        contenido: 'Come algo antes de actividad prolongada o intensa.',
      },
      {
        estado: 'Bajo',
        tipo: 'Hidratación',
        contenido: 'Mantén hidratación con agua.',
      },
      {
        estado: 'Bajo',
        tipo: 'Control continuo',
        contenido: 'Monitorea y consulta si se repite con frecuencia nocturna.',
      },

      // 25 Óptimo Otros momentos (80–130)
      {
        estado: 'Óptimo',
        tipo: 'General',
        contenido:
          'Valor 80–130 mg/dL en controles intermedios indica buen control; mantén hábitos saludables.',
      },
      {
        estado: 'Óptimo',
        tipo: 'Alimentaria',
        contenido:
          'Mantén comidas y snacks balanceados según horario y actividad.',
      },
      {
        estado: 'Óptimo',
        tipo: 'Actividad física',
        contenido: 'Actividad regular moderada ayuda a mantener estabilidad.',
      },
      {
        estado: 'Óptimo',
        tipo: 'Hidratación',
        contenido: 'Hidratarse a lo largo del día; evita bebidas azucaradas.',
      },
      {
        estado: 'Óptimo',
        tipo: 'Control continuo',
        contenido:
          'Registra valores y compáralos por horarios para detectar patrones.',
      },

      // 26 Alto Otros momentos (131–180)
      {
        estado: 'Alto',
        tipo: 'General',
        contenido:
          'Valor 131–180 mg/dL fuera de comidas indica elevación; revisar alimentación previa y medicación.',
      },
      {
        estado: 'Alto',
        tipo: 'Alimentaria',
        contenido: 'Evitar meriendas altas en carbohidratos simples.',
      },
      {
        estado: 'Alto',
        tipo: 'Actividad física',
        contenido: 'Actividad ligera puede ayudar si está indicado.',
      },
      {
        estado: 'Alto',
        tipo: 'Hidratación',
        contenido: 'Mantener hidratación; vigilar si hay sed excesiva.',
      },
      {
        estado: 'Alto',
        tipo: 'Control continuo',
        contenido:
          'Registrar y comentar con el equipo de salud si es frecuente.',
      },

      // 27 Hiperglucemia (>180)
      {
        estado: 'Hiperglucemia',
        tipo: 'General',
        contenido:
          'Valor >180 mg/dL fuera de comidas indica mal control; requiere ajuste y seguimiento.',
      },
      {
        estado: 'Hiperglucemia',
        tipo: 'Alimentaria',
        contenido:
          'Evitar snacks azucarados; priorizar opciones con fibra y proteína.',
      },
      {
        estado: 'Hiperglucemia',
        tipo: 'Actividad física',
        contenido:
          'Ejercicio suave si no hay contraindicación y no hay cetonas.',
      },
      {
        estado: 'Hiperglucemia',
        tipo: 'Hidratación',
        contenido: 'Beber agua frecuentemente; evitar bebidas azucaradas.',
      },
      {
        estado: 'Hiperglucemia',
        tipo: 'Control continuo',
        contenido: 'Consultar al profesional si persiste varios días.',
      },

      // 28 Hiperglucemia Crítica Otros momentos (>400)
      {
        estado: 'Hiperglucemia Critica',
        tipo: 'General',
        contenido:
          'Nivel >400 mg/dL fuera de comidas es crítico. Requiere evaluación urgente.',
      },
      {
        estado: 'Hiperglucemia Critica',
        tipo: 'Alimentaria',
        contenido: 'No ingerir alimentos hasta recibir indicaciones médicas.',
      },
      {
        estado: 'Hiperglucemia Critica',
        tipo: 'Actividad física',
        contenido: 'Evitar ejercicio; acudir a urgencias.',
      },
      {
        estado: 'Hiperglucemia Critica',
        tipo: 'Hidratación',
        contenido:
          'Hidratación con agua si es posible; vigilar signos de descompensación.',
      },
      {
        estado: 'Hiperglucemia Critica',
        tipo: 'Control continuo',
        contenido: 'Acude a urgencias de forma inmediata.',
      },
    ];

    for (const rec of recomendaciones) {
      const exists = await this.recomendacionRepo.findOne({
        where: {
          tipoRecomendacion: rec.tipo,
          descripcionRecomendacion: rec.contenido,
        },
      });

      if (!exists) {
        await this.recomendacionRepo.save(
          this.recomendacionRepo.create({
            tipoRecomendacion: rec.tipo,
            descripcionRecomendacion: rec.contenido,
          })
        );
      }
    }

    console.log('✅ Recomendaciones insertadas');
  }
}
