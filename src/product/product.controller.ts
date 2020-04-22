import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { SellerGuard } from '../guards/seller.guard';
import { Product } from '../types/product';
import { User as UserDocument } from '../types/user';
import { User } from '../utilities/user.decorator';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get('/mine')
  @UseGuards(JwtAuthGuard, SellerGuard)
  async listMine(@User() user: UserDocument): Promise<Product[]> {
    const { id } = user;
    return await this.productService.findByOwner(id);
  }

  @Get('/seller/:id')
  async listBySeller(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.findByOwner(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, SellerGuard)
  async create(@Body() product: CreateProductDTO, @User() user: UserDocument): Promise<Product> {
    return await this.productService.create(product, user);
  }

  @Get(':id')
  async read(@Param('id') id: string): Promise<Product> {
    return await this.productService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, SellerGuard)
  async update(@Param('id') id: string, @Body() product: UpdateProductDTO, @User() user: UserDocument): Promise<Product> {
    const { id: userId } = user;
    return await this.productService.update(id, product, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, SellerGuard)
  async delete(@Param('id') id: string, @User() user: UserDocument): Promise<Product> {
    const { id: userId } = user;
    return await this.productService.delete(id, userId);
  }
}
