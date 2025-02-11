import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class AddTocartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateToCartDto {
  @IsInt()
  @Min(1)
  quantity: number;
}
