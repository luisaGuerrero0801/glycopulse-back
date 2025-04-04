import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({type:'text'})
  nombresUsuario: string;

  @Column({type:'text'})
  apellidosUsuario: string;

  @Column({ type: 'date' })
  fechaNacimientoUsuario: Date;

  @Column({type:'text'})
  generoUsuario: string;

  @Column({ unique: true, nullable: false })
  correoUsuario: string;

  @Column({ nullable: false })
  contrasenaUsuario: string;

  @Column({type:'int'})
  telefonoUsuario

  @Column({type:'int'})
  edadUsuario

  @Column({type:'varchar'})
  rhUsuario

  @Column({type:'text'})
  ubicacionUsuario
}

