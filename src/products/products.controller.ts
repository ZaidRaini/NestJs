import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, updateProductDto } from './Dto/product.Dto';
import { JwtGuard } from 'src/users/jwt/jwt.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createProducts(@Body() body: CreateProductDto) {
    const product = await this.productsService.createProduct(body);
    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  @UseGuards(JwtGuard)
  @Post('bulk')
  async createManyProducts(@Body() body: CreateProductDto[]) {
    const products = await this.productsService.createManyProducts(body);
    return {
      message: 'Products created successfully',
      data: products,
    };
  }

  @Get()
  async getAllProduct() {
    const product = await this.productsService.getAllproduct();
    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Get(':id')
  async getProductWithId(@Param('id') id: string) {
    const product = await this.productsService.getProductWithId(id);
    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: updateProductDto) {
    const product = await this.productsService.updateProduct(id, body);
    return { message: 'Product updated successfully', data: product };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productsService.deleteProduct(id);
    return {
      message: 'Product deleted successfully',
      data: product,
    };
  }
}
