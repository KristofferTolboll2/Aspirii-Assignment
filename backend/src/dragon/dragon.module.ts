import { DragonController } from './dragon.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DragonService } from './dragon.service';

@Module({
  imports: [],
  controllers: [DragonController],
  providers: [DragonService],
  exports: [DragonService],
})
export class DragonModule {}
