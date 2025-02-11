import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;
}
