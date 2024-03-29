import { Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Get(':id')
    getByUser(@Param('id') id: number){
        return this.cartService.getCartByUserId(id);
    }

    @Post('delete/:id')
    delete(@Param('id') id: number){
        return this.cartService.deleteById(id);
    }

    @Post('checkout/:id')
    checkOut(@Param('id') id: number){
        return this.cartService.checkoutById(id);
    }
}
