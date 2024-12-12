import { Receta } from 'src/recetas/entities/receta.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @Column()
  nombreCategoria: string;

  @Column({ type: 'text' })
  descripcionCategoria: string;

  @ManyToMany(() => Receta, (receta) => receta.categorias)
  recetas: Receta[];
}
