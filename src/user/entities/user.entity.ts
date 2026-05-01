import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '@roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { unique: true, length: 50 })
  email: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 155 })
  surnames: string;

  @Column('json')
  avatars: string[];

  @Column('varchar', { length: 255, select: false })
  password: string;

  @Column('boolean', { default: true })
  state: boolean;

  @Column('boolean', { default: false })
  accountValidated?: boolean;

  @Column('boolean', { default: false })
  protected?: boolean;

  @Column('datetime', { nullable: true })
  accountValidatedDate?: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column({ name: 'roleId', nullable: false })
  roleId: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
