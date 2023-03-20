import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../@core/modules/auth';
import { Roles } from '../../../@core/decorators';
import { RoleGuard } from '../../../@core/guards/role.guard';
import { PlatformGetAllProfileResponse } from '../interfaces/platform-response.interface';
import { PlatformGetAllProfileQuery } from '../interfaces/platform-request.interface';
import { ProfileService } from '../../../@core/modules/profile';
import { UserRole } from '../../../@core/modules/user/user.enum';

@Controller('platform/profile')
@ApiTags('Platform')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, type: [PlatformGetAllProfileResponse] })
  async getAllProfile(@Query() query: PlatformGetAllProfileQuery) {
    return this.profileService.getAllWithOptions({
      title: query.specialization,
      currentStack: query.techStack.map((item) => new Types.ObjectId(item)),
      otherStack: query.techStack.map((item) => new Types.ObjectId(item)),
      level: query.experienceLevel,
      yearsOfExperience: query.yearsOfExperience,
      'language.en': query.englishLevel,
      commitment: query.commitment,
      location: query.region,
      avaliability: query.readyToStart,
    });
  }
}
