import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findOne(@Param('idUsuario') idUsuario: number) {
    return this.usuariosService.findOne(idUsuario);
  }

  @Patch(':idUsuario')
  update(
    @Param('idUsuario') idUsuario: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
    return this.usuariosService.update(idUsuario, updateUsuarioDto);
  }

  @Delete(':idUsuario')
  remove(@Param('idUsuario') idUsuario: number) {
    return this.usuariosService.remove(idUsuario);
  }
}
