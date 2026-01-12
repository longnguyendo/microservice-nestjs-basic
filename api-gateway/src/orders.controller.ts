import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
  ) {}

  @Get()
  async getAllOrders() {
    return this.ordersClient
      .send({ cmd: 'get_all_orders' }, {})
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            'Orders service unavailable',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }),
      );
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersClient
      .send({ cmd: 'get_order_by_id' }, parseInt(id))
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            error.message || 'Order not found',
            HttpStatus.NOT_FOUND,
          );
        }),
      );
  }

  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    return this.ordersClient
      .send({ cmd: 'get_orders_by_user' }, parseInt(userId))
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            'Failed to get user orders',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  @Post()
  async createOrder(@Body() createOrderDto: any) {
    return this.ordersClient
      .send({ cmd: 'create_order' }, createOrderDto)
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            'Failed to create order',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  @Put(':id/status')
  async updateOrderStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.ordersClient
      .send({ cmd: 'update_order_status' }, { id: parseInt(id), status: body.status })
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            error.message || 'Failed to update order status',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersClient
      .send({ cmd: 'delete_order' }, parseInt(id))
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            error.message || 'Failed to delete order',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }
}