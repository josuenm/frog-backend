import { hashSync } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../types/RegisterDTO';
import { Rule } from './Rule.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 50, name: 'first_name' })
  firstName: string;

  @Column({ length: 50, name: 'last_name' })
  lastName: string;

  @Column({ length: 25, unique: true })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'date' })
  dateBirth: Date;

  @Column({ type: 'enum', enum: Gender, default: Gender.male })
  gender: Gender;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => Rule)
  @JoinTable()
  roles: Rule[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
