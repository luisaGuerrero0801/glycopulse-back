import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { RecomendacionesGlucometria } from 'src/recomendaciones-glucometria/entities/recomendaciones-glucometria.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecomendacionesEstado {
  @PrimaryGeneratedColumn()
  idRecomendacionEstado: number;

  @ManyToOne(
    () => RecomendacionesGlucometria,
    (recomendaciones) => recomendaciones.estado,
    {
      eager: true,
    }
  )
  @JoinColumn({ name: 'idRecomendacion' })
  recomendacion: RecomendacionesGlucometria;

  @ManyToOne(() => EstadoGlucometria, (estados) => estados.recomendaciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idEstado' })
  estado: EstadoGlucometria;
}
