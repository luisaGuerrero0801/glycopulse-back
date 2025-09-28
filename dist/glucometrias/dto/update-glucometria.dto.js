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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGlucometriaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_glucometria_dto_1 = require("./create-glucometria.dto");
const class_validator_1 = require("class-validator");
const momento_glucometria_enum_1 = require("../enums/momento-glucometria.enum");
class UpdateGlucometriaDto extends (0, mapped_types_1.PartialType)(create_glucometria_dto_1.CreateGlucometriaDto) {
}
exports.UpdateGlucometriaDto = UpdateGlucometriaDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateGlucometriaDto.prototype, "fechaGlucometria", void 0);
__decorate([
    (0, class_validator_1.IsMilitaryTime)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateGlucometriaDto.prototype, "horaGlucometria", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateGlucometriaDto.prototype, "nivelGlucometria", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateGlucometriaDto.prototype, "idUsuario", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(momento_glucometria_enum_1.MomentoGlucometria, {
        message: `El momento debe ser uno de: ${Object.values(momento_glucometria_enum_1.MomentoGlucometria).join(', ')}`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateGlucometriaDto.prototype, "momento", void 0);
//# sourceMappingURL=update-glucometria.dto.js.map