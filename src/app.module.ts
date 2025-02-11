import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { PaymentsModule } from './payments/payments.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UsersModule, ProductsModule, CartModule, PaymentsModule, PrismaModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
