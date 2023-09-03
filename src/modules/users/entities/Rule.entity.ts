import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
}
