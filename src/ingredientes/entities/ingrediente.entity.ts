import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IngredientesReceta } from 'src/ingredientes-receta/entities/ingredientes-receta.entity';

@Entity()
export class Ingrediente {
  @PrimaryGeneratedColumn()
  idIngrediente: number;

  @Column({ unique: true })
  nombreIngrediente: string;

  @OneToMany(
    () => IngredientesReceta,
    (ingredientesReceta) => ingredientesReceta.ingrediente
  )
  recetas: IngredientesReceta[];

  @BeforeInsert()
  @BeforeUpdate()
  normalizeName() {
    this.nombreIngrediente = this.nombreIngrediente
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
