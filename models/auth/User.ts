import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"
import { Address, Group } from "../";
import { Base } from "../Base";
import { Permission } from './Permission';

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

    @OneToMany(type => Address, address => address.user)
    addresses: Address[];

    @ManyToMany(type => Group, (group) => group.users)
    @JoinTable({ name: 'group_users', joinColumn: { name: 'user_id' }, inverseJoinColumn: { name: 'group_id' }})
    groups: Group[];

    @ManyToMany(type => Permission, permission => permission.users)
    @JoinTable({ name: 'user_permissions', joinColumn: { name: 'user_id' }, inverseJoinColumn: { name: 'permission_id' } })
    permissions: Permission[]
}
