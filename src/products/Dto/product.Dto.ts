import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

export class updateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsOptional()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
