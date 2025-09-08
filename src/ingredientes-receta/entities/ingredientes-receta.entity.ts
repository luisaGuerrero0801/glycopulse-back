import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Receta } from 'src/recetas/entities/receta.entity';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';

@Entity()
export class IngredientesReceta {
  @PrimaryGeneratedColumn()
  idIngredienteReceta: number;

  @Column('decimal')
  cantidadIngredienteReceta: number;

  @Column()
  medidaIngredienteReceta: string;

  @ManyToOne(() => Receta, (receta) => receta.ingredientes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idReceta' })
  receta: Receta;

  @ManyToOne(() => Ingrediente, (ingrediente) => ingrediente.recetas, {
    eager: true,
  })
  @JoinColumn({ name: 'idIngrediente' })
  ingrediente: Ingrediente;
}
