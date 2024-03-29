import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import { Tag } from "./tag.entity";

export class BookTag {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, book => book.tags)
    @JoinColumn({name: 'bookId'})
    book: Book;

    @ManyToOne(() => Tag, tag => tag.books)
    tag: Tag
}