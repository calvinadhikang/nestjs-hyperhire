import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import { HeaderTransaction } from "./header-transaction.entity";

@Entity()
export class DetailTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Book)
    @JoinColumn()
    book: Book;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    subtotal: number;

    @ManyToOne(() => HeaderTransaction, header => header.detail)
    header: HeaderTransaction;
}