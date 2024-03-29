import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Cart } from 'src/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Cart])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
