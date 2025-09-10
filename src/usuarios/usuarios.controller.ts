import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get('conteo-rol-rh')
  async getCountByRolAndRh() {
    return this.usuariosService.countByRolAndRh();
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('doctores')
  buscarDoctores() {
    return this.usuariosService.buscarDoctores();
  }

  @Get(':idUsuario')
  findOne(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.usuariosService.findOne(idUsuario);
  }

  @Get(':idUsuario/info')
  getBasicInfo(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.usuariosService.getBasicInfo(idUsuario);
  }

  @Get('doctor/:idDoctor/pacientes')
  findPacientesByDoctor(@Param('idDoctor', ParseIntPipe) idDoctor: number) {
    return this.usuariosService.findPacientesByDoctor(idDoctor);
  }

  @Patch(':idUsuario')
  update(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
    return this.usuariosService.update(idUsuario, updateUsuarioDto);
  }

  @Delete(':idUsuario')
  remove(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.usuariosService.remove(idUsuario);
  }

  @Patch(':idUsuario/estado')
  cambiarEstado(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
    @Body('activo') activo: boolean
  ) {
    return this.usuariosService.cambiarEstado(idUsuario, activo);
  }

  @Patch(':idPaciente/asignar-doctor')
  asignarDoctor(
    @Param('idPaciente', ParseIntPipe) idPaciente: number,
    @Body('idDoctor', ParseIntPipe) idDoctor: number
  ) {
    return this.usuariosService.asignarDoctor(idPaciente, idDoctor);
  }
}
