import { DataSource } from 'typeorm';
import { Address, City, Community, Country, Group, Province, User, Permission } from '../models';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'secr3t!',
    database: 'test-database',
    entities: [
        User,
        Country,
        Community,
        Province,
        City,
        Address,
        Group,
        Permission
    ],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
});

export default AppDataSource;