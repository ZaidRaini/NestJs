import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => orderItemDto)
  items: orderItemDto[];
}

export class orderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  quantity: number;
}
