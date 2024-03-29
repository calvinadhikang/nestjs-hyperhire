import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { AddToCart } from './dto/add-cart.dto';
import { Cart } from 'src/entities/cart.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ){}

    async findAll(search: string){
        const query = this.bookRepository.createQueryBuilder('book');
        query.where('book.title ILIKE :search', { search: `%${search}%` });

        return await query.getMany();
    }

    async create(createBookDto: CreateBookDto){
        return await this.bookRepository.save(createBookDto);
    }

    async addCart(addBookDto: AddToCart){
        const book = await this.bookRepository.findOneBy({id: addBookDto.book})

        const cart = await this.cartRepository.create({
            userId: addBookDto.user,
            quantity: addBookDto.quantity,
            subtotal: addBookDto.quantity * book.price,
            book: book
        })

        return await this.cartRepository.save(cart)
    }
}
