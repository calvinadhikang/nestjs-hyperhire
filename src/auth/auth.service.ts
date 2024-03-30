import { RegisterDto } from './dto/register.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {} 

    async login(loginDto: LoginDto){
        const user = await this.userRepository.findOneBy({
            username: loginDto.username,
            password: loginDto.password
        });
        
        if (!user) {
            return {
                error: true,
                message: "User not found !"
            }
        }

        return user
    }

    async register(registerDto: RegisterDto){
        const user = await this.userRepository.findOneBy({username: registerDto.username})
        if (user) {
            return {
                error: true,
                message: 'Username has been used !'
            }
        }
        return await this.userRepository.save(registerDto);
    }

}
