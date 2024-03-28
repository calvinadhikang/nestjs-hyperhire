import { RegisterDto } from './dto/register.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {} 

    async login(loginDto: LoginDto){
        try {
            return await this.userRepository.findOneByOrFail({username: loginDto.username, password: loginDto.password});
        } catch (error){
            throw new NotFoundException('User not found !');
        }
    }

    async register(registerDto: RegisterDto){
        try {
            return await this.userRepository.save(registerDto);
        } catch (error) {
            
        }
    }

}
