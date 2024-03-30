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
        @Query('search') search: string = '',
        @Query('tags') tags: string[] = [],
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5
    ){
        return this.bookService.findAll(search, tags, page, limit);
    }
    
    @Post('add')
    create(@Body() createBookDto: CreateBookDto){
        return this.bookService.create(createBookDto);
    }

    @Post('buy')
    buy(@Body() addToCart: AddToCart){
        console.log(addToCart)
        return this.bookService.addCart(addToCart);
    }
}
