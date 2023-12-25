import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './entities/user.entity';

//Making Instance of User to perform functions
@CustomRepository(User)
export class UserRepository extends Repository<User> {}
