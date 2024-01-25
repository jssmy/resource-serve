import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column('varchar', { length: 155, unique: true })
  name: string;

  @Column('boolean', { default: true })
  state: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: User;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updateAt?: Date;
}
