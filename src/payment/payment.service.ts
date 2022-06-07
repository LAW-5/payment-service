import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
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
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class PaymentService {
  @InjectRepository(Payment)
  private readonly repository: Repository<Payment>;

  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger;

  public async balanceDetail({
    id,
  }: BalanceDetailDto): Promise<BalanceDetailResponse> {
    this.logger.log('info', `try checking balance for user with id: ${id}`);
    const payment: Payment = await this.repository.findOne({
      where: { userId: id },
    });

    if (!payment) {
      const newPayment: Payment = new Payment();
      newPayment.userId = id;
      await this.repository.save(newPayment);

      this.logger.log(
        'info',
        `wallet not found, creating new wallet for user with id: ${id}`,
      );

      return {
        status: HttpStatus.OK,
        error: null,
        balance: newPayment.balance,
        id: newPayment.id,
      };
    }

    return {
      status: HttpStatus.OK,
      error: null,
      balance: payment.balance,
      id: payment.id,
    };
  }

  public async topUp({ id, amount }: TopUpRequest): Promise<TopUpResponse> {
    const payment: Payment = await this.repository.findOne(id);

    this.logger.log('info', `topup ${amount} for wallet ${id}`);

    if (!payment) {
      this.logger.log('warn', `no wallet with given id: ${id}`);
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['no wallet with given id'],
      };
    }

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

    this.logger.log('info', `decrease ${amount} for wallet ${id}`);

    if (!payment) {
      this.logger.log('warn', `no wallet with given id: ${id}`);
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['no wallet with given id'],
      };
    }

    payment.balance -= amount;

    await this.repository.save(payment);

    return {
      status: HttpStatus.OK,
      error: null,
    };
  }
}
