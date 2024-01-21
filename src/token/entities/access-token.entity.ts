import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('access_tokens')
export class AccessToken {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column('uuid')
  userId: string;

  @Column('boolean', { default: false })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
