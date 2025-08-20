import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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
}
