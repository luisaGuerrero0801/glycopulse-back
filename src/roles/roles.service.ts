import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-role.dto';
import { UpdateRolDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Rol) private readonly roles: Repository<Rol>) {}

  async create(createRolDto: CreateRolDto) {
    const rol = this.roles.create(createRolDto);
    return await this.roles.save(rol);
  }

  async findAll() {
    return await this.roles.find();
  }

  async findOne(idRol: number) {
    return await this.roles.findOneBy({ idRol });
  }

  async update(idRol: number, updateRolDto: UpdateRolDto) {
    return await this.roles.update(idRol, updateRolDto);
  }

  async remove(idRol: number) {
    return await this.roles.delete(idRol);
  }
}
