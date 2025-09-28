"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecomendacionesGlucometriaService = void 0;
const common_1 = require("@nestjs/common");
let RecomendacionesGlucometriaService = class RecomendacionesGlucometriaService {
    create(createRecomendacionesGlucometriaDto) {
        return 'This action adds a new recomendacionesGlucometria';
    }
    findAll() {
        return `This action returns all recomendacionesGlucometria`;
    }
    findOne(id) {
        return `This action returns a #${id} recomendacionesGlucometria`;
    }
    update(id, updateRecomendacionesGlucometriaDto) {
        return `This action updates a #${id} recomendacionesGlucometria`;
    }
    remove(id) {
        return `This action removes a #${id} recomendacionesGlucometria`;
    }
};
exports.RecomendacionesGlucometriaService = RecomendacionesGlucometriaService;
exports.RecomendacionesGlucometriaService = RecomendacionesGlucometriaService = __decorate([
    (0, common_1.Injectable)()
], RecomendacionesGlucometriaService);
//# sourceMappingURL=recomendaciones-glucometria.service.js.map