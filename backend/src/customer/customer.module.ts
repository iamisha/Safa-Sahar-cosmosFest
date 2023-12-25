import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { CustomerResolver } from './customer.resolver';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([CustomerRepository])],
  providers: [CustomerService, CustomerResolver],
  exports: [CustomerService],
})
export class CustomerModule {}
