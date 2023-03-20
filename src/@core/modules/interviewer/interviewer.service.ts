import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/@core/base/base.service';
import { Interviewer, InterviewerDocument } from './interviewer.schema';

@Injectable()
export class InterviewerService extends BaseService<InterviewerDocument> {
  constructor(
    @InjectModel(Interviewer.name)
    private interviewerModel: Model<InterviewerDocument>,
  ) {
    super(interviewerModel);
  }
}
