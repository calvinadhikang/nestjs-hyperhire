import { PrimaryGeneratedColumn } from 'typeorm';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService){}

    @Get()
    getAll(){
        return this.tagService.findAll();
    }

    @Post('add')
    addTag(@Body() createTagDto: CreateTagDto){
        return this.tagService.create(createTagDto)
    }
}
