import { IsNumber } from 'class-validator';
import {
  BalanceDetailRequest,
  TopUpRequest,
  DecreaseBalanceRequest,
} from './payment.pb';

export class BalanceDetailDto implements BalanceDetailRequest {
  @IsNumber()
  public readonly id: number;
}

export class TopUpDto implements TopUpRequest {
  @IsNumber()
  public readonly id: number;

  @IsNumber()
  public readonly amount: number;
}

export class DecreaseBalanceDto implements DecreaseBalanceRequest {
  @IsNumber()
  public readonly id: number;

  @IsNumber()
  public readonly amount: number;
}
