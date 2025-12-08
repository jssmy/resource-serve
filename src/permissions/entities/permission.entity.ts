import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypePermissions } from '../types/type-permissions.type';
import { Role } from '@roles/entities/role.entity';
import { HttpMethod } from '@commons/enums/http- methods';

@Entity('permissions')
export class Permission {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('integer')
  order: number;

  @Column('varchar', { length: 155, unique: true })
  name: string;

  @Column('varchar', { length: 155, nullable: true })
  route?: string;

  @Column('enum', { enum: TypePermissions, default: TypePermissions.MENU })
  type: TypePermissions;

  @Column('enum', { enum: HttpMethod, nullable: true })
  method: HttpMethod;

  @Column('boolean', { default: true })
  state?: boolean;

  @Column('boolean', { default: false })
  protected?: boolean;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role;

  @ManyToOne(() => Permission, (permission) => permission.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' }) // Nombre de la columna que define la relación padre
  parent?: Permission;

  @Column({ name: 'parent_id', nullable: true })
  parentId?: string;

  // Relación de auto-referencia con hijos
  @OneToMany(() => Permission, (permission) => permission.parent)
  children?: Permission[];

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: string;
}
