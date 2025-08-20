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
import { Receta } from 'src/recetas/entities/receta.entity';

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
  rhUsuario: string;

  @Column({ unique: true, nullable: false })
  correoUsuario: string;

  @Column({ nullable: false })
  contrasenaUsuario: string;

  @Column({ type: 'varchar' })
  celularUsuario: string;

  @Column({ nullable: false })
  ciudadUsuario: string;

  @Column({ nullable: false })
  paisUsuario: string;

  @Column({ default: 'Activo' })
  estado: 'Activo' | 'Inactivo';

  //verificación por correo
  @Column({ default: false })
  verificado: boolean;

  //id usuario responsable DOCTOR
  @Column({ nullable: true })
  idUsuarioResponsable?: number;

  //relación con la tabla roles
  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'idRol' })
  rol: Rol;

  @OneToMany(() => Glucometria, (glucometria) => glucometria.usuario)
  glucometrias: Glucometria[];

  @OneToMany(() => Receta, (receta) => receta.usuario)
  recetas: Receta[];
}
