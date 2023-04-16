/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  activeUsers: User[] = [];

  constructor() {
    this.activeUsers = [];
  }
  createUser(user: CreateUserDto): User {
    const newUser: User = { username: user.username, moneyAmount: 100 };
    return newUser;
  }

  saveUserInCache(user: User): void {
    //Check for name collision
    const userExists = this.activeUsers.find(
      (u) => u.username === user.username,
    );
    if (userExists) {
      throw new HttpException('Name already exists', 401);
    }
    this.activeUsers.push(user);
  }

  getUserFromCache(username: string): User {
    const user = this.activeUsers.find((u) => u.username === username);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async updateUserAmount(username: string, updatedAmount: number) {
    const user = this.activeUsers.find((u) => u.username === username);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    user.moneyAmount = updatedAmount;
    return user;
  }
}
