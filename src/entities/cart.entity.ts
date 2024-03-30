import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: number;

    @ManyToOne(() => Book, book => book.id)
    @JoinColumn()
    book: Book;

    @Column()
    quantity: number;

    @Column()
    subtotal: number;
}