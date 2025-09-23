import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Receta } from 'src/recetas/entities/receta.entity';

@Entity()
export class PasosReceta {
  @PrimaryGeneratedColumn()
  idPasoReceta: number;

  @Column()
  ordenPasoReceta: number;

  @Column()
  descripcionPasoReceta: string;

  @ManyToOne(() => Receta, (receta) => receta.pasos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idReceta' })
  receta: Receta;
}
