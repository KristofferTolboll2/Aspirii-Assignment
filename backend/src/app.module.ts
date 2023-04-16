import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DragonModule } from './dragon/dragon.module';
import { DragonService } from './dragon/dragon.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';

@Module({
  imports: [
    DragonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UserController, AppController],
  providers: [UserService, DragonService, AppService],
})
export class AppModule {}
