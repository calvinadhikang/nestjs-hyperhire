import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AddToCart } from './dto/add-cart.dto';
import { retry } from 'rxjs';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    getAll(
        @Query('search') search: string = ''
    ){
        return this.bookService.findAll(search);
    }
    
    @Post('add')
    create(@Body() createBookDto: CreateBookDto){
        return this.bookService.create(createBookDto);
    }

    @Post('buy')
    buy(@Body() addToCart: AddToCart){
        return this.bookService.addCart(addToCart);
    }
}
