import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DustbinService } from 'src/dustbin/dustbin.service';
import { DriverRepository } from '../driver/driver.repository';
import { State } from 'src/driver/inputs/status.enum';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class CronService {
  constructor(
    private readonly dustbinService: DustbinService,
    private readonly driverRepository: DriverRepository,
    private readonly mailService: MailService,
  ) {}

  @Cron('*/1000000000000 * * * * *')
  async checkDustbinStatusAndNotifyDriver() {
    const dustbin = await this.dustbinService.checkDustbinStatus();
    if(dustbin===null){
      return {status:'no dustbin is full'}
    }
    const driver = await this.driverRepository.findOne({ where: { state: State.idle } });
    if (dustbin && driver) {
      this.mailService.sendEmptyMessage(dustbin,driver.user.email)
      if (!driver.dustbins) {
        driver.dustbins = [];
      }
      driver.dustbins.push(dustbin);
      this.driverRepository.save(driver);
      return {status:'success'}
    }
  }
}
