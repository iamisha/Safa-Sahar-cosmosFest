import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { DustbinService } from './dustbin.service';
import { DustbinRepository } from './dustbin.repository';
import { DustbinResolver } from './dustbin.resolver';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([DustbinRepository])],
  providers: [DustbinService, DustbinResolver],
  exports: [DustbinService],
})
export class DustbinModule {}
