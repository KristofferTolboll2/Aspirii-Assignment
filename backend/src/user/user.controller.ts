/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FetchUserDto } from './dto/user.dto';

/**
 * Unfortunately I did not get to finish this part of the code.
 * The idea was to save the users games in the cache in order for the user to wager on different DnD battles.
 * This would be achieved by saving a user in a "cache" (in-memory list), and then saving the user's games in a "database" (in-memory list).
 * The system would recalculate the amount of money on every battle, and then wager on them.
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.createUser(createUserDto);
    this.userService.saveUserInCache(user);
    return user;
  }

  @Get()
  getUser(@Query() { username }: FetchUserDto) {
    return this.userService.getUserFromCache(username);
  }
}
