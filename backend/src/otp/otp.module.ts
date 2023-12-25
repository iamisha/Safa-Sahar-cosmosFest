import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { OtpService } from './otp.service';
import { OtpRepository } from './otp.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([OtpRepository])],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
