import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'test',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        }),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
