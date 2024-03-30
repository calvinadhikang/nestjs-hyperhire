import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Get(':id')
    getByUser(
        @Param('id') id: number,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 3    
    ){
        return this.cartService.getCartByUserId(id, page, limit);
    }

    @Post('delete/:id')
    delete(@Param('id') id: number){
        return this.cartService.deleteById(id);
    }

    @Post('checkout/:id')
    checkOut(@Param('id') id: number){
        return this.cartService.checkoutByUserId(id);
    }
}
