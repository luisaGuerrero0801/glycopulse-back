import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @Column()
  nombreRol: string;
}
