import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { DriverService } from './driver.service';
import { DriverRepository } from './driver.repository';
import { DriverResolver } from './driver.resolver';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([DriverRepository])],
  providers: [DriverService, DriverResolver],
  exports: [DriverService],
})
export class DriverModule {}
