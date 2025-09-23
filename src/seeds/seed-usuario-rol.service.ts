import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from 'src/roles/entities/rol.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsuarioRolSeed {
  constructor(
    @InjectRepository(Rol) private roleRepo: Repository<Rol>,
    @InjectRepository(Usuario) private userRepo: Repository<Usuario>
  ) {}

  async run() {
    // Roles iniciales
    const roles = ['Paciente', 'Admin', 'Doctor'];

    for (const nombre of roles) {
      const exists = await this.roleRepo.findOne({
        where: { nombreRol: nombre },
      });
      if (!exists) {
        await this.roleRepo.save(this.roleRepo.create({ nombreRol: nombre }));
      }
    }

    const adminRole = await this.roleRepo.findOne({
      where: { nombreRol: 'Admin' },
    });

    if (!adminRole) {
      console.error(
        ' Error: El rol Admin no existe, no se puede crear el usuario administrador.'
      );
      return;
    }

    const adminEmail = 'glycopulse@gmail.com';
    const adminExists = await this.userRepo.findOne({
      where: { correoUsuario: adminEmail },
    });

    if (!adminExists) {
      const hashedPassword = await bcryptjs.hash('glycopulse123', 10);

      const adminUser = this.userRepo.create({
        nombresUsuario: 'Admin',
        apellidosUsuario: 'Principal',
        fechaNacimientoUsuario: '2000-04-11',
        generoUsuario: 'Femenino',
        rhUsuario: 'O+',
        correoUsuario: adminEmail,
        contrasenaUsuario: hashedPassword,
        celularUsuario: '3112065084',
        ciudadUsuario: 'Bogotá',
        paisUsuario: 'Colombia',
        estado: 'Activo',
        verificado: true,
        rol: { idRol: adminRole.idRol },
        idUsuarioResponsable: null,
      });

      await this.userRepo.save(adminUser);
      console.log(`Usuario administrador creado: ${adminEmail}`);
    } else {
      console.log(`Usuario administrador ya existe: ${adminEmail}`);
    }
  }
}
