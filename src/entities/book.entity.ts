import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    writer: string;

    @Column({
        default: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg'
    })
    image: string;

    @Column({
        type: 'bigint'
    })
    price: number;

    @ManyToMany(() => Tag, tag => tag.books)
    @JoinTable()
    tags: Tag[];
}