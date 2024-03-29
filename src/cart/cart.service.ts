import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>
    ){}

    async getCartByUserId(id: number){
        return await this.cartRepository.find({
            where: {userId: id},
            relations: ['book']
        });
    }
}
