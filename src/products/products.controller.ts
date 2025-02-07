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
  createProducts(@Body() body: CreateProductDto) {
    const product = this.productsService.createProduct(body);
    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  @UseGuards(JwtGuard)
  @Post('bulk')
  createManyProducts(@Body() body: CreateProductDto[]) {
    const product = this.productsService.createManyProducts(body);
    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  @Get()
  getAllProduct() {
    const product = this.productsService.getAllproduct();
    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Get(':id')
  getProductWithId(@Param('id') id: string) {
    const product = this.productsService.getProductWithId(id);
    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: updateProductDto) {
    const product = this.productsService.updateProduct(id, body);
    return { message: 'Product updated successfully', data: product };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const product = this.productsService.deleteProduct(id);
    return {
      message: 'Product deleted successfully',
      data: product,
    };
  }
}
