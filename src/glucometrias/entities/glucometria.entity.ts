import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MomentoGlucometria } from '../enums/momento-glucometria.enum';

@Entity()
export class Glucometria {
  @PrimaryGeneratedColumn()
  idGlucometria: number;

  @Column({ type: 'date' })
  fechaGlucometria: Date;

  @Column({ type: 'time' })
  horaGlucometria: string;

  @Column({ type: 'int' })
  nivelGlucometria: number;

  @Column({ type: 'enum', enum: MomentoGlucometria })
  momento: MomentoGlucometria;

  //relación con la tabla usuarios
  @ManyToOne(() => Usuario, (usuario) => usuario.glucometrias)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @ManyToOne(() => RangoGlucometria, (rango) => rango.glucometrias, {
    eager: true,
  })
  @JoinColumn({ name: 'idRango' })
  rango: RangoGlucometria;
}
