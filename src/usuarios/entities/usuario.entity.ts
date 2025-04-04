import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ unique: true, nullable: false })
  correoUsuario: string;

  @Column({ nullable: false })
  contrasenaUsuario: string;
}
