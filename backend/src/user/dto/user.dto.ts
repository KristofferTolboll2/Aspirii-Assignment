import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class FetchUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
