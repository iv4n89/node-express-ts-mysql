import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Base } from "../Base";
import { User } from "./User";

@Entity('auth_groups')
export class Group extends Base{

    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'tinyint', default: 1 })
    is_active: number;

    @ManyToMany(() => User, (user) => user.groups, { createForeignKeyConstraints: true, cascade: ['insert', 'update'] })
    @JoinTable({ name: 'group_users'})
    users: User[]

}
