import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthenticatedRequest, JwtGuard } from 'src/users/jwt/jwt.guard';
import { AddTocartDto, UpdateToCartDto } from './dto/card.dto';

@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(
    @Req() req: AuthenticatedRequest,
    @Body() cartData: AddTocartDto,
  ) {
    return await this.cartService.addToCart(req.user.id, cartData);
  }

  @Get()
  async getUserCart(@Req() req: AuthenticatedRequest) {
    return await this.cartService.getUserCart(req.user.id);
  }

  @Patch(':id')
  async updateCartItem(
    @Req() req: AuthenticatedRequest,
    @Body() cartData: UpdateToCartDto,
    @Param('id') cartId: string,
  ) {
    return await this.cartService.updateCartItem(req.user.id, cartId, cartData);
  }

  @Delete(':id')
  async removeCartItem(
    @Req() req: AuthenticatedRequest,
    @Param('id') cartId: string,
  ) {
    return await this.cartService.removeCartItem(req.user.id, cartId);
  }

  @Delete()
  async clearCart(@Req() req: AuthenticatedRequest) {
    return await this.cartService.clearCart(req.user.id);
  }
}
