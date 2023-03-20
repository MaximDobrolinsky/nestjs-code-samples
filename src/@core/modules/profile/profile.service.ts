import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import * as _ from 'lodash';

import { BaseService } from '../../base/base.service';
import { GetAllProfileOptions } from './profile.interface';
import { Profile, ProfileDocument } from './profile.schema';
import { ProfileStatus } from './profile.enum';

@Injectable()
export class ProfileService extends BaseService<ProfileDocument> {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<ProfileDocument>,
  ) {
    super(profileModel);
  }

  async getByIds(_ids: Types.ObjectId[]): Promise<ProfileDocument[]> {
    return this.profileModel.find({
      _id: {
        $in: _ids,
      },
    });
  }

  async getAllWithOptions(
    options?: GetAllProfileOptions,
  ): Promise<ProfileDocument[]> {
    const query = _.pickBy(options, _.identity);

    const currentStackFilter = query?.currentStack?.length > 0 && {
      'currentStack.skill': {
        $in: query.currentStack,
      },
    };

    const otherStackFilter = query?.otherStack?.length > 0 && {
      'otherStack.skill': {
        $in: query.otherStack,
      },
    };

    const yearsOfExperienceFilter = query?.yearsOfExperience && {
      yearsOfExperience: query.yearsOfExperience,
    };

    const titleFilter = query?.title && {
      title: {
        $regex: `${query.title}`,
        $options: 'i',
      },
    };

    const levelFilter = query?.level && {
      level: {
        $regex: `${query.level}`,
        $options: 'i',
      },
    };

    const englishLevelFilter = query?.['language.en'] && {
      'language.en': {
        $regex: `${query['language.en']}`,
        $options: 'i',
      },
    };

    const commitmentFilter = query?.commitment && {
      commitment: {
        $regex: `${query.commitment}`,
        $options: 'i',
      },
    };

    const locationFilter = query?.location && {
      location: {
        $regex: `${query.location}`,
        $options: 'i',
      },
    };

    const avaliabilityFilter = query?.avaliability && {
      avaliability: {
        $regex: `${query.avaliability}`,
        $options: 'i',
      },
    };

    const statusFilter = query?.status && {
      status: {
        $regex: `${query?.status}`,
        $options: 'i',
      },
    };

    return this.profileModel
      .find({
        ...titleFilter,
        ...currentStackFilter,
        ...otherStackFilter,
        ...levelFilter,
        ...yearsOfExperienceFilter,
        ...englishLevelFilter,
        ...commitmentFilter,
        ...locationFilter,
        ...avaliabilityFilter,
        ...statusFilter,
      })
      .populate([
        'currentStack.skill',
        'otherStack.skill',
        'interviews.interviewer',
        'workExperience.skills',
      ])
      .exec();
  }

  async softDelete(
    id: Types.ObjectId,
    session?: ClientSession,
  ): Promise<ProfileDocument> {
    return this.profileModel
      .findByIdAndUpdate(id, { status: ProfileStatus.REMOVED }, { session })
      .exec();
  }
}
