/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FetchUserDto } from './dto/user.dto';

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
