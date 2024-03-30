import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { BookModule } from './book/book.module';
import { CartModule } from './cart/cart.module';
import * as bodyParser from 'body-parser';

@Module({
    imports: [
        TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        //---Development Only---//
        username: 'postgres',
        password: 'postgres',
        database: 'test',
        synchronize: true,
        //---End of Development Only---//
        
        //---Production Only---//
        // database: 'nanaspos_test_postgres',
        // username: 'nanaspos_calvinadhikang',
        // password: 'calvinadhikang02',
        //---End of Production Only---//
        
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        AuthModule,
        TagModule,
        BookModule,
        CartModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(bodyParser.json()).forRoutes('*')
    }
}
