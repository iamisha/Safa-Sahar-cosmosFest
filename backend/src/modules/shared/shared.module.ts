import { Module } from '@nestjs/common';
import { SettingService } from './services/setting.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [SettingService],
  exports: [SettingService],
})
export class SharedModule {}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU0LCJqdGkiOiJmNzZmZTE2MGZhZWY3ODk3YjA5NGZhNWZkY2VhNmEyMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5ODkxNzI2MSwiZXhwIjoxNjk5MDAzNjYxfQ.5SHSSWiA-ZsNapaQdeVQ9GNRmNR9g-q7jqJaf29bYfk
