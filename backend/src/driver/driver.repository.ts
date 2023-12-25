import { Driver } from './entities/driver.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Driver)
export class DriverRepository extends Repository<Driver> {}
