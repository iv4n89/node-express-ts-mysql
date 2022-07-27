import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


export abstract class Base {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @DeleteDateColumn()
    deleted_at: Timestamp;
}
