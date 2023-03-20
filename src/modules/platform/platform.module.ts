import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../../@core/modules/auth';
import { PlatformService } from './platform.service';
import { AuthController } from './controllers';
import { ProfileController } from './controllers/profile.controller';
import { ProfileModule } from '../../@core/modules/profile';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    ProfileModule,
  ],
  controllers: [AuthController, ProfileController],
  providers: [PlatformService],
  exports: [PlatformService],
})
export class PlatformModule {}
