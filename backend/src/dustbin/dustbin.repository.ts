import { Dustbin } from './entities/dustbin.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Dustbin)
export class DustbinRepository extends Repository<Dustbin> {}
