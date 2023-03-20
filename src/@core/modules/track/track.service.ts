import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { BaseService } from '../../../@core/base/base.service';
import { CreateTrackDto } from './track.dto';
import { TrackAction, TrackObjectType } from './track.enum';
import { Track, TrackDocument } from './track.schema';

@Injectable()
export class TrackService extends BaseService<TrackDocument> {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {
    super(trackModel);
  }

  async userCreateProfile(
    newValue: any,
    profileId: Types.ObjectId,
    userId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<TrackDocument> {
    return this.create<CreateTrackDto>(
      {
        action: TrackAction.CREATE,
        oldValue: null,
        newValue: newValue,
        origin: {
          id: new Types.ObjectId(userId),
          type: TrackObjectType.USER,
        },
        consumer: {
          id: profileId,
          type: TrackObjectType.PROFILE,
        },
      },
      session,
    );
  }

  async userUpdateProfile(
    oldValue: any,
    newValue: any,
    profileId: Types.ObjectId,
    userId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<TrackDocument> {
    return this.create<CreateTrackDto>(
      {
        action: TrackAction.UPDATE,
        oldValue: oldValue,
        newValue: newValue,
        origin: {
          id: new Types.ObjectId(userId),
          type: TrackObjectType.USER,
        },
        consumer: {
          id: profileId,
          type: TrackObjectType.PROFILE,
        },
      },
      session,
    );
  }

  async userDeleteProfile(
    oldValue: any,
    profileId: Types.ObjectId,
    userId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<TrackDocument> {
    return this.create<CreateTrackDto>(
      {
        action: TrackAction.DELETE,
        oldValue: oldValue,
        newValue: null,
        origin: {
          id: new Types.ObjectId(userId),
          type: TrackObjectType.USER,
        },
        consumer: {
          id: profileId,
          type: TrackObjectType.PROFILE,
        },
      },
      session,
    );
  }
}
