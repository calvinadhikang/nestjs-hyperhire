import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { Cart } from 'src/entities/cart.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async getCartByUserId(id: number) {
        return await this.cartRepository.find({
            where: {userId: id},
            relations: ['book']
        });
    }
    
    async deleteById(id: number) {
        const cart = await this.cartRepository.findOneBy({id: id})
        return await this.cartRepository.remove(cart)
    }

    async checkoutById(id: number) {
        const cart = await this.cartRepository.findOneBy({id: id})
        const user = await this.userRepository.findOneBy({id: cart.userId})

        if (user.point >= cart.subtotal) {
            user.point = user.point - cart.subtotal
            console.log(user.point)
            await this.userRepository.save(user)
            await this.cartRepository.remove(cart)
            
            return {
                error: false,
                message: "Checkout Success"
            }
        }else{
            return {
                error: true,
                message: "Insufficient Fund !"
            }
        }
    }
}
