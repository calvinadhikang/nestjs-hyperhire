import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    writer: string;

    @Column()
    image: string;

    @Column({
        type: 'bigint'
    })
    price: number;

    @OneToMany(() => Tag, tag => tag.books)
    @JoinTable()
    tags: Tag[];
}