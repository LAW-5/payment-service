/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'payment';

export interface BalanceDetailRequest {
  id: number;
}

export interface BalanceDetailResponse {
  status: number;
  error: string[];
  balance: number;
}

export interface TopUpRequest {
  id: number;
  amount: number;
}

export interface TopUpResponse {
  status: number;
  error: string[];
}

export interface DecreaseBalanceRequest {
  id: number;
  amount: number;
}

export interface DecreaseBalanceResponse {
  status: number;
  error: string[];
}

export const PAYMENT_PACKAGE_NAME = 'payment';

export interface PaymentServiceClient {
  getBalanceDetail(
    request: BalanceDetailRequest,
  ): Observable<BalanceDetailResponse>;

  topUp(request: TopUpRequest): Observable<TopUpResponse>;

  decreaseBalance(
    request: DecreaseBalanceRequest,
  ): Observable<DecreaseBalanceResponse>;
}

export interface PaymentServiceController {
  getBalanceDetail(
    request: BalanceDetailRequest,
  ):
    | Promise<BalanceDetailResponse>
    | Observable<BalanceDetailResponse>
    | BalanceDetailResponse;

  topUp(
    request: TopUpRequest,
  ): Promise<TopUpResponse> | Observable<TopUpResponse> | TopUpResponse;

  decreaseBalance(
    request: DecreaseBalanceRequest,
  ):
    | Promise<DecreaseBalanceResponse>
    | Observable<DecreaseBalanceResponse>
    | DecreaseBalanceResponse;
}

export function PaymentServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getBalanceDetail',
      'topUp',
      'decreaseBalance',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('PaymentService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('PaymentService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PAYMENT_SERVICE_NAME = 'PaymentService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
