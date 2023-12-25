import { Customer } from './entities/customer.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
