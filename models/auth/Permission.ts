import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { Base } from '../Base';
import { Group, User } from '../';

@Entity('auth_permissions')
export class Permission extends Base {

    @Column({ type: 'varchar', unique: true })
    name: string;

    @ManyToOne(type => Permission, permission => permission.children)
    @JoinColumn({ name: 'parent_id' })
    parent: Permission;

    @OneToMany(type => Permission, permission => permission.parent, { eager: true })
    @JoinColumn({ name: 'parent_id' })
    children: Permission[];

    @ManyToMany(type => Group, group => group.permissions)
    groups: Group[];

    @ManyToMany(type => User, user => user.permissions)
    users: User[]

}
