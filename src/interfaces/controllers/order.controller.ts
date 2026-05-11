import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/useCases/Order/CreateOrder.usecase';
import { AcceptOrderUseCase } from '../../application/useCases/Order/AcceptOrder.usecase';
import { DistributeOrderUseCase } from '../../application/useCases/Order/DistributeOrder.usecase';
import { CreateOrderDto } from '../../application/dtos/order/CreateOrder.dto';
import { JwtAuthGuard } from '../../auth/guards/JwtAuthGuard';
import { IReq } from '../IReq/IRequest';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrder: CreateOrderUseCase,
    private readonly acceptOrder: AcceptOrderUseCase,
    private readonly distributeOrder: DistributeOrderUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateOrderDto, @Request() req: IReq) {
    const customerId = req.user?.userId;
    if (!customerId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const result = await this.createOrder.execute({
      ...dto,
      customerId,
      requestedDate: new Date(dto.requestedDate),
      description: dto.description,
    });

    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    this.distributeOrder
      .execute(result.data.getId().getValue())
      .catch(console.error);

    return {
      success: true,
      data: {
        id: result.data.getId().getValue(),
        status: result.data.getStatus(),
      },
    };
  }

  @Get('/available')
  @UseGuards(JwtAuthGuard)
  getAvailable(@Request() req: IReq) {
    // Только для изготовителей
    if (req.user?.role !== 'MAKER') {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    // Реализовать поиск доступных заказов по навыкам
    return { success: true, data: [] };
  }

  @Post('/:id/accept')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async accept(@Param('id') orderId: string, @Request() req: IReq) {
    const makerId = req.user?.userId;
    if (!makerId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const result = await this.acceptOrder.execute(orderId, makerId);
    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return { success: true, data: { status: result.data.getStatus() } };
  }

  // Endpoint для ручного триггера распределения (для тестов / крона)
  @Post('/:id/distribute')
  @HttpCode(HttpStatus.OK)
  async triggerDistribute(@Param('id') orderId: string) {
    const result = await this.distributeOrder.execute(orderId);
    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }
    return { success: true };
  }
}
