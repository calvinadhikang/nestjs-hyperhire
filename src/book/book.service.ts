import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { QueryResult, Repository } from 'typeorm';
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

    async findAll(search: string, tags: string[], page: number, limit: number){
        let offset = (page - 1) * limit

        const query = await this.bookRepository.createQueryBuilder('book');
        
        if (Array.isArray(tags) && tags.length > 0) {
            query.innerJoin('book.tags', 'tag', 'tag.name IN (:...tags)', { tags });
        } else if (typeof tags === 'string' && tags !== '') {
            query.innerJoin('book.tags', 'tag', 'tag.name = :tag', { tag: tags });
        } else {
            query.leftJoinAndSelect('book.tags', 'tag');
        }

        // Add another left join to fetch tags associated with each book
        query.leftJoinAndSelect('book.tags', 'bookTags');

        query.where('book.title ILIKE :search', { search: `%${search}%` });

        query.skip(offset).take(limit)

        return await query.getMany();
    }

    async create(createBookDto: CreateBookDto){
        return await this.bookRepository.save(createBookDto);
    }

    async addCart(addBookDto: AddToCart){
        const book = await this.bookRepository.findOneBy({id: addBookDto.book})
        const cartExist = await this.cartRepository.findOneBy({userId: addBookDto.user, book: book})

        if (cartExist) {
            cartExist.quantity = cartExist.quantity + 1
            cartExist.subtotal = cartExist.quantity * book.price

            return await this.cartRepository.save(cartExist)
        }else{
            const newcart = await this.cartRepository.create({
                userId: addBookDto.user,
                quantity: addBookDto.quantity,
                subtotal: addBookDto.quantity * book.price,
                book: book
            })
    
            return await this.cartRepository.save(newcart)
        }

    }
}
