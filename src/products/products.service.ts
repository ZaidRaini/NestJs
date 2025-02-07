import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, updateProductDto } from './Dto/product.Dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(productData: CreateProductDto) {
    const { name, description, price, stock, imageUrl } = productData;

    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl,
      },
    });

    return product;
  }

  // Create multiple products
  async createManyProducts(productsData: CreateProductDto[]) {
    const products = await this.prisma.product.createMany({
      data: productsData,
    });

    return products;
  }

  async getAllproduct() {
    return await this.prisma.product.findMany();
  }

  async getProductWithId(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.getProductWithId(id);
    return await this.prisma.product.delete({ where: { id: product.id } });
  }

  async updateProduct(id: string, updateProductDto: updateProductDto) {
    const product = await this.getProductWithId(id);
    return await this.prisma.product.update({
      where: { id: product.id },
      data: updateProductDto,
    });
  }
}
