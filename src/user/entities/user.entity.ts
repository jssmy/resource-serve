import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserGrant } from "src/commons/types/user-grant";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar', { unique: true, length: 50 })
    email: string;

    @Column('varchar', { length: 155 })
    name: string;

    @Column('json')
    avatars: string[]

    @Column('varchar', { length: 255, select: false })
    password: string;

    @Column('enum', { enum: UserGrant, default: UserGrant.ADMIN})
    userGrant: UserGrant;


    @Column('boolean', { default: true})
    state?: boolean;

    @Column('boolean', { default: false})
    accountValidated?: boolean;
    
    @Column('datetime', { nullable: true})
    accountValidatedDate?: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt?: Date;

}
