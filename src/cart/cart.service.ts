import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTocartDto, UpdateToCartDto } from './dto/card.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(userId: string, cartData: AddTocartDto) {
    const { productId, quantity } = cartData;

    // check if product exist
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    const existingCartItem = await this.prisma.cart.findFirst({
      where: { userId, productId },
    });
    if (existingCartItem) {
      return await this.prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    }

    return await this.prisma.cart.create({
      data: { userId, productId, quantity },
    });
  }

  async getUserCart(userId: string) {
    return await this.prisma.cart.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  async updateCartItem(
    userId: string,
    cartId: string,
    cartData: UpdateToCartDto,
  ) {
    const cartItem = await this.prisma.cart.findUnique({
      where: { id: cartId },
    });

    if (!cartItem || cartItem.userId !== userId) {
      throw new NotFoundException('Cart item not found');
    }

    const newQuantity = cartItem.quantity + cartData.quantity;

    return await this.prisma.cart.update({
      where: { id: cartId },
      data: { quantity: newQuantity },
    });
  }

  async removeCartItem(userId: string, cartId: string) {
    const cartItem = await this.prisma.cart.findUnique({
      where: { id: cartId },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    return await this.prisma.cart.delete({ where: { id: cartId } });
  }

  async clearCart(userId: string) {
    return await this.prisma.cart.deleteMany({ where: { userId } });
  }
}
