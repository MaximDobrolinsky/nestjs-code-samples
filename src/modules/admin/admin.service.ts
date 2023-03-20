import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import * as _ from 'lodash';

import {
  CreateSkillDto,
  SkillDocument,
  SkillService,
} from '../../@core/modules/skill';
import { CreateUserDto, UserService } from '../../@core/modules/user';
import { Transaction } from '../../@core/decorators';
import { AwsS3Service } from '../../sdk/aws/services';
import {
  generateInterviewersImagePath,
  generateProfilesImagePath,
  generateSkillImagePath,
} from '../../@shared/helpers';
import { AWS_ACL } from '../../sdk/aws/enums';
import {
  CreateInterviewerDto,
  InterviewerDocument,
  InterviewerService,
} from '../../@core/modules/interviewer';
import mongoose, { Types } from 'mongoose';
import { UserRole, UserStatus } from '../../@core/modules/user/user.enum';
import {
  CreateProfileDto,
  ProfileDocument,
  ProfileService,
  UpdateProfileDto,
} from '../..//@core/modules/profile';
import { TeamService } from '../../@core/modules/team';
import { UserToken } from '../../@core/modules/auth';
import {
  CreateTrackDto,
  TrackAction,
  TrackObjectType,
  TrackService,
} from '../../@core/modules/track';

@Injectable()
export class AdminService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly userService: UserService,
    private readonly skillService: SkillService,
    private readonly awsS3Service: AwsS3Service,
    private readonly interviewerService: InterviewerService,
    private readonly profileService: ProfileService,
    private readonly teamService: TeamService,
    private readonly trackService: TrackService,
  ) {}

  async createSkill(
    file: Express.Multer.File,
    payload: { title: string },
  ): Promise<SkillDocument> {
    const imageKey = generateSkillImagePath(file.originalname);
    try {
      if (file) {
        await this.awsS3Service.uploadObject(
          imageKey,
          file.buffer,
          file.mimetype,
          AWS_ACL.PUBLIC_READ,
        );
      }

      return this.skillService.create<CreateSkillDto>({
        title: payload.title,
        imageKey,
      });
    } catch (err) {
      await this.awsS3Service.removeObject(imageKey);
      throw err;
    }
  }

  async createInterviewer(
    file: Express.Multer.File,
    payload: { name: string; position: string },
  ): Promise<InterviewerDocument> {
    const imageKey = generateInterviewersImagePath(file.originalname);

    try {
      if (file) {
        await this.awsS3Service.uploadObject(
          imageKey,
          file.buffer,
          file.mimetype,
          AWS_ACL.PUBLIC_READ,
        );
      }

      return this.interviewerService.create<CreateInterviewerDto>({
        name: payload.name,
        position: payload.position,
        imageKey,
      });
    } catch (err) {
      await this.awsS3Service.removeObject(imageKey);
      throw err;
    }
  }

  async updateSkill(
    file: Express.Multer.File,
    id: string,
    payload: {
      title?: string;
      imageKey?: string;
    },
  ): Promise<SkillDocument> {
    const skill = await this.skillService.getById(id);

    if (skill && file) {
      await this.awsS3Service.removeObject(skill.imageKey);

      const imageKey = generateSkillImagePath(file.originalname);
      await this.awsS3Service.uploadObject(
        imageKey,
        file.buffer,
        file.mimetype,
        AWS_ACL.PUBLIC_READ,
      );

      payload.imageKey = imageKey;
    }

    return this.skillService.update(id, payload);
  }

  async updateInterviewer(
    file: Express.Multer.File,
    id: string,
    payload: {
      name?: string;
      position?: string;
      imageKey?: string;
    },
  ): Promise<InterviewerDocument> {
    const interviewer = await this.interviewerService.getById(id);

    if (interviewer && file) {
      await this.awsS3Service.removeObject(interviewer.imageKey);

      const imageKey = generateInterviewersImagePath(file.originalname);
      await this.awsS3Service.uploadObject(
        imageKey,
        file.buffer,
        file.mimetype,
        AWS_ACL.PUBLIC_READ,
      );

      payload.imageKey = imageKey;
    }

    return this.interviewerService.update(id, payload);
  }

  async removeSkill(id: string): Promise<SkillDocument> {
    const skill = await this.skillService.getById(id);

    if (skill.imageKey) {
      await this.awsS3Service.removeObject(skill.imageKey);
    }

    return this.skillService.delete(id);
  }

  async removeInterviewer(id: string): Promise<InterviewerDocument> {
    const interviewer = await this.interviewerService.getById(id);

    if (interviewer.imageKey) {
      await this.awsS3Service.removeObject(interviewer.imageKey);
    }

    return this.interviewerService.delete(id);
  }

  @Transaction()
  async createProfile(
    createdProfileDto: CreateProfileDto,
    file: Express.Multer.File,
    jwtToken: UserToken,
  ): Promise<ProfileDocument> {
    const transactionSession = _.last(arguments);
    const imageKey = generateProfilesImagePath(file?.originalname);

    try {
      if (file) {
        await this.awsS3Service.uploadObject(
          imageKey,
          file.buffer,
          file.mimetype,
          AWS_ACL.PUBLIC_READ,
        );
      }

      const profile = await this.profileService.create(
        {
          ...createdProfileDto,
          imageKey,
        },
        transactionSession,
      );

      await this.trackService.userCreateProfile(
        profile.toString(),
        new Types.ObjectId(jwtToken._id),
        profile._id,
        transactionSession,
      );

      return profile;
    } catch (err) {
      if (file) {
        await this.awsS3Service.removeObject(imageKey);
      }

      throw err;
    }
  }

  @Transaction()
  async updateProfile(
    profileId: Types.ObjectId,
    updatedProfileDto: CreateProfileDto,
    file: Express.Multer.File,
    jwtToken: UserToken,
  ): Promise<ProfileDocument> {
    const transactionSession = _.last(arguments);
    const imageKey = generateProfilesImagePath(file?.originalname);

    try {
      const originProfile = await this.profileService.getById(profileId);

      if (file) {
        await this.awsS3Service.uploadObject(
          imageKey,
          file.buffer,
          file.mimetype,
          AWS_ACL.PUBLIC_READ,
        );

        updatedProfileDto.imageKey = imageKey;
      }

      const profile = await this.profileService.update(
        profileId,
        updatedProfileDto,
        transactionSession,
      );

      await this.trackService.userUpdateProfile(
        originProfile.toString(),
        profile.toString(),
        new Types.ObjectId(jwtToken._id),
        profile._id,
        transactionSession,
      );

      return profile;
    } catch (err) {
      throw err;
    }
  }

  @Transaction()
  async deleteProfile(
    profileId: Types.ObjectId,
    jwtToken: UserToken,
  ): Promise<ProfileDocument> {
    const transactionSession = _.last(arguments);

    const profile = await this.profileService.delete(
      profileId,
      transactionSession,
    );

    await this.trackService.userDeleteProfile(
      profile.toString(),
      profileId,
      new Types.ObjectId(jwtToken._id),
      transactionSession,
    );

    if (profile?.imageKey) {
      await this.awsS3Service.removeObject(profile?.imageKey);
    }

    return profile;
  }

  @Transaction()
  async createTeamProfile(
    teamId: Types.ObjectId,
    createProfileDto: CreateProfileDto,
    file: Express.Multer.File,
    jwtToken: UserToken,
  ): Promise<ProfileDocument> {
    const transactionSession = _.last(arguments);
    const imageKey = generateProfilesImagePath(file?.originalname);

    try {
      if (file) {
        await this.awsS3Service.uploadObject(
          imageKey,
          file.buffer,
          file.mimetype,
          AWS_ACL.PUBLIC_READ,
        );
      }

      const profile = await this.profileService.create(
        {
          ...createProfileDto,
          imageKey,
        },
        transactionSession,
      );

      await this.trackService.userCreateProfile(
        profile.toString(),
        new Types.ObjectId(jwtToken._id),
        profile._id,
        transactionSession,
      );

      await this.teamService.addProfile(
        teamId,
        profile._id,
        transactionSession,
      );

      return profile;
    } catch (err) {}
  }

  @Transaction()
  async deleteTeamProfile(
    profileId: Types.ObjectId,
    jwtToken: UserToken,
  ): Promise<ProfileDocument> {
    const transactionSession = _.last(arguments);
    const originProfile = await this.profileService.getById(profileId);
    const profile = await this.profileService.softDelete(
      profileId,
      transactionSession,
    );

    await this.trackService.userUpdateProfile(
      originProfile.toString(),
      profile.toString(),
      new Types.ObjectId(jwtToken._id),
      profile._id,
      transactionSession,
    );

    if (profile?.imageKey) {
      await this.awsS3Service.removeObject(profile?.imageKey);
    }

    return profile;
  }

  // @Transaction()
  async createAdminUser() {
    // const transactionSession = _.last(arguments);
    const userDto: CreateUserDto = {
      name: 'Admin 1',
      username: 'admin',
      password: 'admin0000',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    };

    return this.userService.createWithHashedPassword(userDto);
  }
}
