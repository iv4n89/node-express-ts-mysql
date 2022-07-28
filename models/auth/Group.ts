import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Base } from "../Base";
import { User } from "./User";
import { Permission } from '../';

@Entity('auth_groups')
export class Group extends Base{

    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'tinyint', default: 1 })
    is_active: number;

    @ManyToMany(type => User, (user) => user.groups)
    users: User[]

    @ManyToMany(type => Permission, permission => permission.groups)
    @JoinTable({ name: 'group_permissions', joinColumn: { name: 'group_id' }, inverseJoinColumn: { name: 'permission_id' } })
    permissions: Permission[]

}
