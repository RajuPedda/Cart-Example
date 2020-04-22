import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';

import { User } from '../utilities/user.decorator';
import { User as UserDocument } from '../types/user';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  listOrders(@User() { id }: UserDocument) {
    return this.orderService.listOrdersByUser(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrder(@Body() order: CreateOrderDTO, @User() { id }: UserDocument) {
    return this.orderService.createOrder(order, id);
  }
}
