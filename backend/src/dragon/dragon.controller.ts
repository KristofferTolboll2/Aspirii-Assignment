/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DragonService } from './dragon.service';
import {
  AttackDragonDto,
  BattleDragonDto,
  GetDragonQueryParams,
} from './dto/dragon.dto';

@Controller('dragon')
@ApiTags('dragon')
export class DragonController {
  constructor(private readonly dragonService: DragonService) {}
  @Get()
  @ApiOperation({ summary: 'Get all dragons' })
  @ApiResponse({ status: 200, description: 'Return all dragons' })
  getDragons(
    @Query() { hitPoints, limit, withoutSpeed }: GetDragonQueryParams,
  ) {
    return this.dragonService.fetchDragons(hitPoints, limit, withoutSpeed);
  }

  @Post('battle')
  @ApiOperation({ summary: 'Battle dragons' })
  @ApiResponse({ status: 200, description: 'Return the winner' })
  battleDragons(@Body() { dragon1, dragon2 }: BattleDragonDto) {
    this.dragonService.reloadDragons();
    return this.dragonService.battleDragons(dragon1, dragon2);
  }

  @Post()
  attackDragons(@Body() { dragon }: AttackDragonDto) {
    return this.dragonService.attackDragon(dragon, true);
  }
}
