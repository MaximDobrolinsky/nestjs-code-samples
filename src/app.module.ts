import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin';
import { PlatformModule } from './modules/platform';
@Module({
  imports: [AdminModule, PlatformModule],
})
export class AppModule {}
