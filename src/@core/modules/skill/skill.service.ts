import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '../../../@core/base/base.service';
import { Skill, SkillDocument } from './skill.schema';

@Injectable()
export class SkillService extends BaseService<SkillDocument> {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {
    super(skillModel);
  }
}
