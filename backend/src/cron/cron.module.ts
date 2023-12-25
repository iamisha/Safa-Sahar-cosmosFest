import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { DustbinService } from 'src/dustbin/dustbin.service';
import { DustbinRepository } from 'src/dustbin/dustbin.repository';
import { TypeOrmExModule } from 'src/modules/decorators/typeorm.module';
import { DriverRepository } from 'src/driver/driver.repository';
import { MailRepository } from 'src/mail/mail.repository';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([DustbinRepository, DriverRepository,MailRepository])],
  providers: [CronService, DustbinService, MailService],
})
export class CronModule {}
