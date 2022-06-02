import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BalanceDetailDto, DecreaseBalanceDto, TopUpDto } from './payment.dto';
import {
  BalanceDetailResponse,
  DecreaseBalanceResponse,
  PAYMENT_SERVICE_NAME,
  TopUpResponse,
} from './payment.pb';
import { PaymentService } from './payment.service';

@Controller('promo')
export class PaymentController {
  @Inject(PaymentService)
  private readonly service: PaymentService;

  @GrpcMethod(PAYMENT_SERVICE_NAME, 'GetBalanceDetail')
  private getBalanceDetail(
    payload: BalanceDetailDto,
  ): Promise<BalanceDetailResponse> {
    return this.service.balanceDetail(payload);
  }

  @GrpcMethod(PAYMENT_SERVICE_NAME, 'TopUp')
  private topUp(payload: TopUpDto): Promise<TopUpResponse> {
    return this.service.topUp(payload);
  }

  @GrpcMethod(PAYMENT_SERVICE_NAME, 'DecreaseBalance')
  private decreaseBalance(
    payload: DecreaseBalanceDto,
  ): Promise<DecreaseBalanceResponse> {
    return this.service.decreaseBalance(payload);
  }
}
