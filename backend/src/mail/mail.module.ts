import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { MailService } from './mail.service';
import { MailRepository } from './mail.repository';
import { MailResolver } from './mail.resolver';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([MailRepository])],
  providers: [MailService, MailResolver],

  exports: [MailService],
})
export class MailModule {}
