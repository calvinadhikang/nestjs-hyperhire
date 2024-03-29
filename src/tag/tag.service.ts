import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {} 
    
    async findAll(){
        return await this.tagRepository.find();
    }

    async create(createTagDto: CreateTagDto){
        return await this.tagRepository.save(createTagDto);
    }
}
