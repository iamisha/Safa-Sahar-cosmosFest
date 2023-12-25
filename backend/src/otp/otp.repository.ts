import { Otp } from './entities/otp.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Otp)
export class OtpRepository extends Repository<Otp> {}
