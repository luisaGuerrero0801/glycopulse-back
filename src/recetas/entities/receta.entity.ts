import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { IngredientesReceta } from 'src/ingredientes-receta/entities/ingredientes-receta.entity';
import { PasosReceta } from 'src/pasos-recetas/entities/pasos-receta.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
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
  caloriasReceta: number;

  @Column()
  tiempoReceta: string;

  @Column()
  imagenReceta: string;

  @Column()
  nivelReceta: string;

  @Column()
  categoriaReceta: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.recetas)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToMany(
    () => IngredientesReceta,
    (ingredientesReceta) => ingredientesReceta.receta,
    { cascade: true, eager: true }
  )
  ingredientes: IngredientesReceta[];

  @OneToMany(() => PasosReceta, (pasos) => pasos.receta, {
    cascade: true,
    eager: true,
  })
  pasos: PasosReceta[];
}
