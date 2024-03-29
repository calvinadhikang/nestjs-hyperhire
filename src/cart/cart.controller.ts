import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Get(':id')
    getByUser(@Param('id') id:number ){
        return this.cartService.getCartByUserId(id);
    }
}
