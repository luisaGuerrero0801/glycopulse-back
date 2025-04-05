import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Rol } from 'src/roles/entities/rol.entity';
import { Glucometria } from 'src/glucometrias/entities/glucometria.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  nombresUsuario: string;

  @Column()
  apellidosUsuario: string;

  @Column({ type: 'date' })
  fechaNacimientoUsuario: Date;

  @Column()
  generoUsuario: string;

  @Column({ type: 'varchar' })
  rhUsuario;

  @Column({ unique: true, nullable: false })
  correoUsuario: string;

  @Column({ nullable: false })
  contrasenaUsuario: string;

  @Column({ nullable: false })
  ciudadUsuario: string;

  @Column({ nullable: false })
  paisUsuario: string;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'idRol' })
  rol: Rol;

  @OneToMany(() => Glucometria, (glucometria) => glucometria.usuario)
  glucometrias: Glucometria[];
}
