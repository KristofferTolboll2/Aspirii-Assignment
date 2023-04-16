import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Dragon } from '../dragon.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc',
}
@Exclude()
export class GetDragonQueryParams {
  @IsOptional()
  @IsEnum(SortingOrder)
  @Expose()
  @ApiProperty({ description: 'The name of the first dragon in the battle' })
  hitPoints: SortingOrder;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Expose()
  @ApiProperty({
    description: 'The name of the first dragon in the battle',
  })
  limit: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Expose()
  @ApiProperty({
    description: 'Too include the speed attribute',
  })
  withoutSpeed: boolean;
}

@Exclude()
export class BattleDragonDto {
  @IsString()
  @Expose()
  @ApiProperty({ description: 'The name of the first dragon in the battle' })
  dragon1: string;

  @IsString()
  @Expose()
  @ApiProperty({ description: 'The name of the second dragon in the battle' })
  dragon2: string;
}

@Exclude()
export class AttackDragonDto {
  @IsString()
  @Expose()
  @ApiProperty({ description: 'The name of the first dragon in the battle' })
  dragon: string;
}
