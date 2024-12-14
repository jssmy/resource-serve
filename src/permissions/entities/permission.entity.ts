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
import { Role } from 'src/roles/entities/role.entity';
import { HttpMethod } from 'src/commons/enums/http- methods';

@Entity('permissions')
export class Permission {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('integer')
  order: number;

  @Column('varchar', { length: 155, unique: true })
  name: string;

  @Column('varchar', { length: 155 })
  route?: string;

  @Column('enum', { enum: TypePermissions, default: TypePermissions.MENU })
  type: TypePermissions;

  @Column('enum',  {  enum: HttpMethod, default: HttpMethod.GET })
  method: HttpMethod;

  @Column('boolean', { default: true })
  state?: boolean;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role;

  @ManyToOne(() => Permission, (permission) => permission.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' }) // Nombre de la columna que define la relación padre
  parent?: Permission;

  // Relación de auto-referencia con hijos
  @OneToMany(() => Permission, (permission) => permission.parent)
  children?: Permission[];


  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: string;
}
