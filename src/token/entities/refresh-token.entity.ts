import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column('varchar', { unique: true })
  accessTokenId: string;

  @Column('boolean', { default: false })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
