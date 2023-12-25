import { Mail } from './entities/mail.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Mail)
export class MailRepository extends Repository<Mail> {}
