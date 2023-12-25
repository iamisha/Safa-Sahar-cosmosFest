import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { MailService } from './mail.service';
import { MailRepository } from './mail.repository';
import { MailResolver } from './mail.resolver';
import { DustbinRepository } from 'src/dustbin/dustbin.repository';


@Module({
  imports: [TypeOrmExModule.forCustomRepository([MailRepository, DustbinRepository])],
  providers: [MailService, MailResolver],
  exports: [MailService],
})
export class MailModule {}
