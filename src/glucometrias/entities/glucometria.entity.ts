import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Glucometria {
  @PrimaryGeneratedColumn()
  idGlucometria: number;

  @Column({ type: 'date' })
  fechaGlucometria: string;

  @Column({ type: 'time' })
  horaGlucometria: string;

  @Column({ type: 'int' })
  nivelGlucometria: number;

  //relación con la tabla usuarios
  @ManyToOne(() => Usuario, (usuario) => usuario.glucometrias)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;
}
