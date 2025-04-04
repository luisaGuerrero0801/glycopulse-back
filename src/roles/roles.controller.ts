import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-role.dto';
import { UpdateRolDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolesService.create(createRolDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':idRol')
  findOne(@Param('idRol') idRol: number) {
    return this.rolesService.findOne(idRol);
  }

  @Patch(':idRol')
  update(@Param('idRol') idRol: number, @Body() updateRolDto: UpdateRolDto) {
    return this.rolesService.update(idRol, updateRolDto);
  }

  @Delete(':idRol')
  remove(@Param('idRol') idRol: number) {
    return this.rolesService.remove(idRol);
  }
}
