"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecomendacionSeed = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recomendaciones_glucometria_entity_1 = require("../recomendaciones-glucometria/entities/recomendaciones-glucometria.entity");
let RecomendacionSeed = class RecomendacionSeed {
    constructor(recomendacionRepo) {
        this.recomendacionRepo = recomendacionRepo;
    }
    async run() {
        const recomendaciones = [
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Un nivel de glucosa en ayunas por debajo de 54 mg/dL indica una hipoglucemia severa y peligrosa. Si el objetivo es mantener estabilidad, este rango requiere corrección inmediata y atención médica.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Consume carbohidratos de absorción rápida como jugo o glucosa en gel.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evita totalmente la actividad física.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Bebe agua solo después de estabilizarte.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Repite la medición y acude a urgencias si no mejora.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Un valor de glucosa en ayunas entre 55 y 69 mg/dL indica hipoglucemia leve. Debe corregirse inmediatamente para evitar síntomas.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Ingiere 15 g de carbohidratos rápidos (ej. jugo, caramelos, glucosa) y luego desayuna completo.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'No realices ejercicio hasta normalizar los niveles.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua simple tras la estabilización.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Vuelve a medir en 15 minutos; si no mejora, busca atención médica.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Un nivel en ayunas entre 70 y 79 mg/dL está cercano al límite bajo. El objetivo es prevenir descensos hacia hipoglucemia.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Incluye fruta o pan integral en el desayuno para estabilizar.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Come algo antes de realizar actividad física.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Bebe agua al despertar para favorecer el equilibrio.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Monitorea la frecuencia; consulta si se repite.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Un nivel en ayunas dentro de 80–130 mg/dL refleja un buen control basal. Mantener hábitos para estabilidad.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Desayuna con proteínas y carbohidratos complejos (ej. avena, huevo).',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evita ejercicio intenso antes de comer; actividad ligera está bien.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua al despertar y a lo largo del día.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Registra y compara con días previos para detectar tendencias.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Un valor en ayunas de 131–180 mg/dL está por encima del rango recomendado y sugiere ajuste de hábitos o tratamiento.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Reduce carbohidratos simples en la cena previa y prioriza fibra.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Realiza una caminata ligera tras la cena si es seguro.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Mantén hidratación adecuada antes de dormir y al despertar.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Vigila si es un patrón recurrente y consulta al equipo de salud.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Una glucosa en ayunas entre 181 y 399 mg/dL indica mal control nocturno; requiere revisión de dieta o medicación.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Evita carbohidratos simples en la cena y distribuye carbohidratos en porciones controladas.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Actividad ligera tras la cena (si no hay contraindicación).',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua antes de dormir y al despertar; evita bebidas azucaradas.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Si persiste varios días, consulta al profesional que te atiende.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Un valor mayor o igual a 400 mg/dL en ayunas es una urgencia médica. Requiere evaluación inmediata.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'No comer hasta recibir orientación médica; evita carbohidratos.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evitar ejercicio hasta evaluación médica.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Mantener hidratación con agua si no hay contraindicación; vigilar signos de deshidratación.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Acude a urgencias; puede requerir tratamiento urgente.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Un nivel de glucosa menor a 54 mg/dL antes de comer indica hipoglucemia grave. Requiere corrección inmediata.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Consume carbohidratos rápidos antes de la comida (ej. jugo, glucosa en gel).',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evita actividad física hasta normalizar.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua tras estabilizar niveles.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Repite la medición y busca ayuda si no mejora.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Una glucosa de 55–69 mg/dL antes de comer es hipoglucemia leve; corrígela antes de iniciar la comida.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Carbohidratos rápidos y luego la comida habitual con balance de proteínas y fibra.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'No hacer ejercicio previo a la corrección.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua después de normalizar.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Monitorea la recurrencia y consulta si es frecuente.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Un nivel de 70–79 mg/dL antes de comer está cercano a hipoglucemia; iniciar la comida pronto.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Comienza con carbohidratos complejos para estabilizar.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'No realizar ejercicio en ayunas; comer antes de la actividad.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Beber agua antes de comer.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Mide después de la comida para verificar respuesta.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Glucosa 80–130 mg/dL antes de comer refleja buen control; objetivo mantener estabilidad tras ingesta.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Balancea la comida con fibra, proteínas y carbohidratos controlados.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Ejercicio ligero después de comer es recomendable.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua antes de la comida para buena digestión y control glucémico.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Registrar para comparar respuesta postprandial.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Valor de 131–180 mg/dL antes de comer indica elevación; ajustar porciones y composición de la comida.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Reducir porción de carbohidratos y priorizar vegetales y proteínas.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Realizar actividad suave tras la comida si es seguro.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Hidratarse antes y después de la comida.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Vigila tendencias y ajuste terapéutico si persiste.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Una glucosa entre 181 y 399 mg/dL antes de comer indica hiperglucemia; requiere revisión de medicación/dieta.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Evitar azúcares y alimentos con índice glucémico alto en la comida siguiente.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Ejercicio suave solo si no hay contraindicaciones y no hay cetonas.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Beber agua; evitar bebidas azucaradas.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Consultar al equipo de salud si es persistente.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Glucosa mayor o igual a 400 mg/dL antes de comer es crítica. Requiere atención médica urgente.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'No comer hasta recibir indicaciones médicas.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evitar ejercicio; puede empeorar la situación.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Hidratar con agua si es posible; vigilar signos de descompensación.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Acude a urgencias de manera inmediata para evaluación y tratamiento.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Nivel <54 mg/dL tras comer indica hipoglucemia severa; puede deberse a exceso de medicación. Requiere corrección inmediata.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Toma carbohidratos de acción rápida y un snack ligero (ej. yogurt, pan).',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Suspende ejercicio inmediatamente.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Beber agua tras estabilizarte.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Si no mejora, busca ayuda médica; revisa esquema terapéutico.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Glucosa 55–69 mg/dL tras la comida indica hipoglucemia leve; corrige y observa.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Carbohidratos rápidos y luego una proteína ligera.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evita actividad física inmediata.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua tras estabilizar.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Monitorea recurrencia; revisa dosis si es frecuente.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Nivel 70–79 mg/dL tras comer en límite bajo; ajustar composición de comidas para evitar descensos.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Incorpora más carbohidratos complejos y proteína en comidas.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evita ejercicio inmediato; espera a estabilizarte.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Mantén hidratación con agua.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Vigila y registra si ocurre con frecuencia.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Glucosa <180 mg/dL tras comer refleja buen control postprandial; mantener porciones y actividad leve.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Mantén porciones moderadas y fibra para controlar el pico glucémico.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Caminata ligera (10–20 min) ayuda a controlar el pico.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua durante y después de la comida.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Registra valores postprandiales para comparar con objetivos.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Glucosa 180–250 mg/dL tras comer está elevada; revisar composición de la comida y el manejo.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Reducir azúcares y harinas refinadas; aumentar fibra y proteína.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Realizar caminata de 10–20 minutos después de comer si es seguro.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Hidratarse con agua; evitar bebidas azucaradas.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Registrar y consultar si se repite como patrón.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Glucosa >250 mg/dL tras la comida es muy alta; requiere medidas para evitar complicaciones.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Evitar postres y bebidas azucaradas; optar por proteína y verdura.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Ejercicio suave solo si no hay cetonas y está indicado por tu médico.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua abundante si no hay contraindicación.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Consulta médica si persiste o aumenta.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Glucosa postprandial >400 mg/dL es crítica; debe evaluarse de inmediato.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'No ingerir más alimentos hasta recibir indicaciones.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evitar ejercicio; acude a urgencias si hay síntomas severos.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Hidratación con agua si la toleras; vigila signos de deshidratación.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Acude a urgencias para evaluación y tratamiento.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Nivel <54 mg/dL fuera de comidas es hipoglucemia severa y peligrosa; atención inmediata.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Consume carbohidratos de rápida absorción (jugo, glucosa) y espera estabilizar.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Suspende cualquier actividad física hasta normalizar.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Beber agua solo después de estabilizarte.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Mide y acude a urgencias si no mejora.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Valor 54–69 mg/dL fuera de comidas indica hipoglucemia leve; corregir para evitar síntomas.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Ingiere 15 g de carbohidratos rápidos y luego un snack proteico si es necesario.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evitar actividad intensa hasta normalizar.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Agua tras la corrección.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Mide de nuevo en 15 minutos.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Nivel 70–79 mg/dL fuera de comidas está cercano al límite; prevenir descenso a hipoglucemia.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Incluye un snack con carbohidratos complejos y proteína si vas a estar activo.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Come algo antes de actividad prolongada o intensa.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Mantén hidratación con agua de manera moderada.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Monitorea y consulta si se repite con frecuencia nocturna.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Valor 80–130 mg/dL en controles intermedios indica buen control; mantén hábitos saludables.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Mantén comidas y snacks balanceados según horario y actividad.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Actividad regular moderada ayuda a mantener estabilidad.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Hidratarse a lo largo del día; evita bebidas azucaradas.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Registra valores y compáralos por horarios para detectar patrones.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Valor 131–180 mg/dL fuera de comidas indica elevación; revisar alimentación previa y medicación.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Evitar meriendas altas en carbohidratos simples.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Actividad ligera puede ayudar si está indicado.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Mantener hidratación; vigilar si hay sed excesiva.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Registrar y comentar con el equipo de salud si es frecuente.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Valor >180 mg/dL fuera de comidas indica mal control; requiere ajuste y seguimiento.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'Evitar snacks azucarados; priorizar opciones con fibra y proteína.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Ejercicio suave si no hay contraindicación y no hay cetonas.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Beber agua frecuentemente; evitar bebidas azucaradas.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Consultar al profesional si persiste varios días.',
            },
            {
                tipoRecomendacion: 'General',
                descripcionRecomendacion: 'Nivel >400 mg/dL fuera de comidas es crítico. Requiere evaluación urgente.',
            },
            {
                tipoRecomendacion: 'Alimentaria',
                descripcionRecomendacion: 'No ingerir alimentos hasta recibir indicaciones médicas.',
            },
            {
                tipoRecomendacion: 'Actividad física',
                descripcionRecomendacion: 'Evitar ejercicio; acudir a urgencias.',
            },
            {
                tipoRecomendacion: 'Hidratación',
                descripcionRecomendacion: 'Hidratación con agua si es posible; vigilar signos de descompensación.',
            },
            {
                tipoRecomendacion: 'Control continuo',
                descripcionRecomendacion: 'Acude a urgencias de forma inmediata.',
            },
        ];
        for (const rec of recomendaciones) {
            const exists = await this.recomendacionRepo.findOne({
                where: {
                    tipoRecomendacion: rec.tipoRecomendacion,
                    descripcionRecomendacion: rec.descripcionRecomendacion,
                },
            });
            if (!exists) {
                await this.recomendacionRepo.save(this.recomendacionRepo.create({
                    tipoRecomendacion: rec.tipoRecomendacion,
                    descripcionRecomendacion: rec.descripcionRecomendacion,
                }));
            }
        }
        console.log('✅ Recomendaciones insertadas');
    }
};
exports.RecomendacionSeed = RecomendacionSeed;
exports.RecomendacionSeed = RecomendacionSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recomendaciones_glucometria_entity_1.RecomendacionesGlucometria)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecomendacionSeed);
//# sourceMappingURL=seed-recomendaciones.service.js.map