import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    getAll(){
        return this.bookService.findAll();
    }
    
    @Post()
    create(@Body() createBookDto: CreateBookDto){
        return this.bookService.create(createBookDto);
    }
}
