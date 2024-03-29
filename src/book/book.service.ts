import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ){}

    async findAll(){
        return await this.bookRepository.find();
    }

    async create(createBookDto: CreateBookDto){
        return await this.bookRepository.save(createBookDto);
    }
}
