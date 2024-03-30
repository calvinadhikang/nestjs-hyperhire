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

    async getCartByUserId(id: number, page: number, limit: number) {
        const skip = (page - 1) * limit

        return await this.cartRepository.find({
            where: {userId: id},
            relations: ['book'],
            take: limit,
            skip: skip
        });
    }
    
    async deleteById(id: number) {
        const cart = await this.cartRepository.findOneBy({id: id})
        await this.cartRepository.remove(cart)

        return {
            error: false,
            message: "A cart item has been deleted !"
        }
    }

    async checkoutByUserId(id: number) {
        let totalPrice = 0
        const user = await this.userRepository.findOneBy({id: id})
        const carts = await this.cartRepository.findBy({userId: id})
        if (carts.length > 0) {
            carts.forEach(element => {
                totalPrice += element.subtotal     
            });
        }else {
            return {
                error: true,
                message: "User cart is empty !"
            }
        }

        if (user.point >= totalPrice) {
            user.point = user.point - totalPrice
            console.log(user.point)
            await this.userRepository.save(user)
            await this.cartRepository.remove(carts)
            
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
