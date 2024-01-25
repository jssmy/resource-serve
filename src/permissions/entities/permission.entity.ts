import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypePermissions } from '../types/type-permissions.type';
import { Role } from 'src/roles/entities/role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('varchar', { length: 155, unique: true })
  name: string;

  @Column('varchar', { length: 155 })
  route?: string;

  @Column('enum', { enum: TypePermissions, default: TypePermissions.MENU })
  type: TypePermissions;

  @Column('boolean', { default: true })
  state?: boolean;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: string;
}
