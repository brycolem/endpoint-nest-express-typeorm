import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './model/application';
import { Note } from './model/note';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: configService.get<string>('DATABASE'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PWD'),
        entities: [Application, Note],
        synchronize: false
      }),
    }),
    TypeOrmModule.forFeature([Application, Note])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
