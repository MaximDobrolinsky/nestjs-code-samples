import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminService } from './admin.service';
import {
  SkillController,
  ProfileController,
  InterviewerController,
  AuthController,
  TeamController,
  UserController,
} from './controllers';
import { AuthModule } from '../../@core/modules/auth';
import { UserModule } from '../../@core/modules/user';
import { SkillModule } from '../../@core/modules/skill';
import { ProfileModule } from '../../@core/modules/profile';
import { InterviewerModule } from '../../@core/modules/interviewer';
import { TeamModule } from '../../@core/modules/team';
import { AwsModule } from '../../sdk/aws/aws.module';
import { TeamGuard } from '../../@core/guards';
import { TrackModule } from '../../@core/modules/track';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    UserModule,
    SkillModule,
    ProfileModule,
    InterviewerModule,
    AwsModule,
    TeamModule,
    TrackModule,
  ],
  controllers: [
    AuthController,
    SkillController,
    ProfileController,
    InterviewerController,
    TeamController,
    UserController,
  ],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
