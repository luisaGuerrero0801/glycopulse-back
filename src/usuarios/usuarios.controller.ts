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

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':idUsuario')
  findOne(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.usuariosService.findOne(idUsuario);
  }

  @Patch(':idUsuario')
  update(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(idUsuario, updateUsuarioDto);
  }

  @Delete(':idUsuario')
  remove(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.usuariosService.remove(idUsuario);
  }

  // ✅ Este endpoint espera un booleano y lo transforma a 'Activo' o 'Inactivo'
  @Patch(':idUsuario/estado')
  cambiarEstado(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
    @Body('activo') activo: boolean,
  ) {
    return this.usuariosService.cambiarEstado(idUsuario, activo);
  }
}
