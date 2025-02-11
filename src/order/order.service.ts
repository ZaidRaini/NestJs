import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: string, orderData: CreateOrderDto) {
    const { items } = orderData;

    if (!items || items.length === 0) {
      throw new BadRequestException('No items provided for the order');
    }

    const productIds = items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== items.length) {
      throw new BadRequestException('One or more products not found');
    }

    const total = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new NotFoundException(
          `Product with ID ${item.productId} not found`,
        );
      }
      return sum + product.price.toNumber() * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) {
              throw new NotFoundException(
                `Product with ID ${item.productId} not found`,
              );
            }
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: product.price,
            };
          }),
        },
      },
    });

    return order;
  }
}
