import { RecomendacionesEstado } from 'src/recomendaciones-estado/entities/recomendaciones-estado.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class RecomendacionesGlucometria {
  @PrimaryGeneratedColumn()
  idRecomendacion: number;

  @Column()
  tipoRecomendacion: string;

  @Column()
  descripcionRecomendacion: string;

  @OneToMany(
    () => RecomendacionesEstado,
    (recomendacionesEstado) => recomendacionesEstado.recomendacion
  )
  estado: RecomendacionesEstado[];
}
