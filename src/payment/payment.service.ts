import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { BalanceDetailDto, DecreaseBalanceDto } from './payment.dto';
import {
  BalanceDetailResponse,
  DecreaseBalanceResponse,
  TopUpRequest,
  TopUpResponse,
} from './payment.pb';

@Injectable()
export class PaymentService {
  @InjectRepository(Payment)
  private readonly repository: Repository<Payment>;

  public async balanceDetail({
    id,
  }: BalanceDetailDto): Promise<BalanceDetailResponse> {
    const payment: Payment = await this.repository.findOne(id);

    return {
      status: HttpStatus.OK,
      error: null,
      balance: payment.balance,
    };
  }

  public async topUp({ id, amount }: TopUpRequest): Promise<TopUpResponse> {
    const payment: Payment = await this.repository.findOne(id);

    payment.balance += amount;

    await this.repository.save(payment);

    return {
      status: HttpStatus.OK,
      error: null,
    };
  }

  public async decreaseBalance({
    id,
    amount,
  }: DecreaseBalanceDto): Promise<DecreaseBalanceResponse> {
    const payment: Payment = await this.repository.findOne(id);

    payment.balance -= amount;

    await this.repository.save(payment);

    return {
      status: HttpStatus.OK,
      error: null,
    };
  }
}
