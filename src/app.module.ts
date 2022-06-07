import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment/payment.entity';
import { PaymentModule } from './payment/payment.module';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Payment],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    PaymentModule,
  ],
})
export class AppModule {}
