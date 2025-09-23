import { RecomendacionesEstado } from 'src/recomendaciones-estado/entities/recomendaciones-estado.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';

@Entity()
export class EstadoGlucometria {
  @PrimaryGeneratedColumn()
  idEstado: number;

  @Column()
  nombreEstado: string;

  @Column()
  descripcionEstado: string;

  @OneToMany(
    () => RecomendacionesEstado,
    (recomendacionesEstado) => recomendacionesEstado.estado
  )
  recomendaciones: RecomendacionesEstado[];

  @OneToMany(() => RangoGlucometria, (rango) => rango.estado)
  rangos: RangoGlucometria[];
}
