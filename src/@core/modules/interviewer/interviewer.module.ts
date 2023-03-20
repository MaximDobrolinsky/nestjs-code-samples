import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Interviewer, InterviewerSchema } from './interviewer.schema';
import { InterviewerService } from './interviewer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interviewer.name, schema: InterviewerSchema },
    ]),
  ],
  providers: [InterviewerService],
  exports: [InterviewerService],
})
export class InterviewerModule {}
