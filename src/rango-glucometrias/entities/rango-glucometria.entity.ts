import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { Glucometria } from 'src/glucometrias/entities/glucometria.entity';
import { MomentoGlucometria } from 'src/glucometrias/enums/momento-glucometria.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class RangoGlucometria {
  @PrimaryGeneratedColumn()
  idRango: number;

  @Column()
  nombreRango: string;

  @Column({ type: 'int' })
  valorMinRango: number;

  @Column({ type: 'int' })
  valorMaxRango: number;

  @Column({
    type: 'enum',
    enum: MomentoGlucometria,
  })
  momento: MomentoGlucometria;

  @ManyToOne(() => EstadoGlucometria, (estado) => estado.rangos, {
    eager: true,
  })
  @JoinColumn({ name: 'idEstado' })
  estado: EstadoGlucometria;

  @OneToMany(() => Glucometria, (glucometria) => glucometria.rango)
  glucometrias: Glucometria[];
}
