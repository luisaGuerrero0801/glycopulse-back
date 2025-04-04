import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @Column()
  nombreRol: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
