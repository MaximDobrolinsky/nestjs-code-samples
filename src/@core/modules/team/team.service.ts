import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateResult } from 'mongodb';
import { ClientSession, Model, Types } from 'mongoose';

import { BaseService } from '../../base/base.service';
import { Team, TeamDocument } from './team.schema';

@Injectable()
export class TeamService extends BaseService<TeamDocument> {
  constructor(
    @InjectModel(Team.name)
    private teamModel: Model<TeamDocument>,
  ) {
    super(teamModel);
  }

  async getAll(): Promise<TeamDocument[]> {
    return this.teamModel
      .find()
      .populate(['profiles'])
      .populate('manager', '-password')
      .exec();
  }

  async getTeamByManagerId(managerId: Types.ObjectId): Promise<TeamDocument> {
    return this.teamModel
      .findOne({
        manager: managerId,
      })
      .exec();
  }

  async addProfile(
    teamId: Types.ObjectId,
    profileId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<UpdateResult> {
    return this.teamModel
      .updateOne(
        { _id: teamId },
        { $push: { profiles: profileId } },
        { new: true, session },
      )
      .exec();
  }
}
