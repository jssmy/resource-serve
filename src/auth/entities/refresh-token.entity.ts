import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('refresh_tokens')
export class RefreshToken {
    @PrimaryColumn({ type: 'varchar' })
    id: string; 

    @Column('varchar')
    accessTokenId: string;

    @Column('boolean', { default: false })
    revoked: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
