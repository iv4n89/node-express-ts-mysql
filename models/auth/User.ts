import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"
import { Address, Group } from "../";
import { Base } from "../Base";

@Entity('auth_users')
export class User extends Base {

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    last_name: string;

    @Column({ type: 'varchar', unique: true })
    username: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', unique: true })
    personal_email: string;

    @Column({ type: 'varchar', select: false })
    password: string;

    @Column({ type: 'varchar', nullable: true, select: false })
    password_token: string;

    @Column({ type: 'date' })
    birth_date: Date;

    @Column({
        type: 'integer',
        nullable: true
    })
    gender: number;

    @Column({ type: 'varchar', nullable: true })
    mobile_phone: string;

    @Column({ type: 'varchar', nullable: true })
    home_phone: string;

    @Column({ type: 'varchar', nullable: true })
    user_image: string;

    @Column({ type: 'varchar', nullable: true })
    bio: string;

    @Column({ type: 'tinyint', default: 1 })
    is_active: number;

    @OneToMany(() => Address, address => address.user)
    addresses: Address[];

    @ManyToMany(() => Group, (group) => group.users, { createForeignKeyConstraints: true })
    @JoinTable({ name: 'group_users'})
    groups: Group[];
}
