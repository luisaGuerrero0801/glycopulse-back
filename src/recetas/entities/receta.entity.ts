import { Categoria } from 'src/categorias/entities/categoria.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Receta {
  @PrimaryGeneratedColumn()
  idReceta: number;

  @Column()
  nombreReceta: string;

  @Column({ type: 'text' })
  descripcionReceta: string;

  @Column()
  porcionesReceta: number;

  @Column()
  tiempoReceta: string;
  @Column()
  imagenReceta: string;

  @Column()
  nivelReceta: string;

  @Column({ type: 'longtext' })
  ingredientesReceta: string;

  @Column({ type: 'longtext' })
  preparacionReceta: string;

  @ManyToMany(() => Categoria, (categoria) => categoria.recetas, {
    eager: true,
  })
  @JoinTable({
    name: 'categorias_recetas',
    joinColumn: {
      name: 'receta_id',
    },
    inverseJoinColumn: {
      name: 'categoria_id',
    },
  })
  categorias: Categoria[];
}
