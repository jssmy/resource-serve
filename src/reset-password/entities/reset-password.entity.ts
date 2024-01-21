import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('reset_passwords')
export class ResetPassword {
  @PrimaryColumn('varchar')
  token: string;

  @Column('varchar')
  userId: string;

  @Column('boolean', { default: false })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('datetime')
  expiresIn: Date;
}
