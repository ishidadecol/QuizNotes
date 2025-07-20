import { Module } from '@nestjs/common';
import { NotesController } from './notes/notes.controller';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quizes/quiz.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        synchronize: false,
        entities: [__dirname + '/**/*.entity.ts'],
        migrations : [__dirname + '/src/database/migrations/*{.ts,.js}'],
        autoLoadEntities: true
      })
    })
  ],
controllers: [NotesController, QuizController],
  providers: [RabbitMQService],
})
export class AppModule { }
