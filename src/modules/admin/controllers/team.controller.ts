import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../@core/modules/auth';
import { Roles } from '../../../@core/decorators';
import { RoleGuard } from '../../../@core/guards/role.guard';

import {
  CreateTeamDto,
  TeamService,
  UpdateTeamDto,
} from '../../../@core/modules/team';
import {
  AdminCreateTeamProfileResponse,
  AdminCreateTeamResponse,
  AdminDeleteTeamProfileResponse,
  AdminDeleteTeamResponse,
  AdminGetAllTeamsResponse,
  AdminGetByIdTeamResponse,
  AdminGetTeamProfilesResponse,
  AdminUpdateTeamProfileResponse,
  AdminUpdateTeamResponse,
} from '../interfaces/admin-response.interface';
import {
  AdminCreateProfileBodyRequest,
  AdminCreateTeamBodyRequest,
  AdminUpdateTeamBodyRequest,
  AdminUpdateProfileBodyRequest,
} from '../interfaces/admin-request.interface';
import { Types } from 'mongoose';
import { UserRole } from '../../../@core/modules/user/user.enum';
import { ProfileService } from 'src/@core/modules/profile';
import { TeamGuard } from '../../../@core/guards';
import { profileMapper } from '../mappers';
import { AdminService } from '../admin.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/team')
@ApiTags('Admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly profileService: ProfileService,
    private readonly adminService: AdminService,
  ) {}

  @Get('')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @ApiResponse({ status: 200, type: [AdminGetAllTeamsResponse] })
  @ApiBearerAuth()
  async getAll() {
    return this.teamService.getAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATION, UserRole.TEAM_MANAGER)
  @UseGuards(TeamGuard)
  @ApiResponse({ status: 200, type: AdminGetByIdTeamResponse })
  @ApiBearerAuth()
  async getById(@Param('id') id: string) {
    return this.teamService.getById(id);
  }

  @Post('')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, type: AdminCreateTeamResponse })
  @ApiBearerAuth()
  async create(@Body() body: AdminCreateTeamBodyRequest) {
    return this.teamService.create<CreateTeamDto>({
      ...body,
      profiles: body.profiles.map((item) => new Types.ObjectId(item)),
      manager: body.manager ? new Types.ObjectId(body.manager) : null,
    });
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATION, UserRole.TEAM_MANAGER)
  @UseGuards(TeamGuard)
  @ApiResponse({ status: 200, type: AdminUpdateTeamResponse })
  @ApiBearerAuth()
  async update(@Param('id') id, @Body() body: AdminUpdateTeamBodyRequest) {
    const profilesToUpdate = body?.profiles && {
      profiles: body.profiles.map((item) => new Types.ObjectId(item)),
    };

    const managersToUpdate = body?.manager && {
      manager: body.manager ? new Types.ObjectId(body.manager) : null,
    };

    return this.teamService.update<UpdateTeamDto>(id, {
      ...body,
      ...profilesToUpdate,
      ...managersToUpdate,
    });
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(TeamGuard)
  @ApiResponse({ status: 200, type: AdminDeleteTeamResponse })
  @ApiBearerAuth()
  async delete(@Param('id') id) {
    return this.teamService.delete(id);
  }

  @Get(':id/profiles')
  @Roles(UserRole.TEAM_MANAGER)
  @UseGuards(TeamGuard)
  @ApiResponse({ status: 200, type: [AdminGetTeamProfilesResponse] })
  @ApiBearerAuth()
  async getTeamProfiles(@Param('id') id: string) {
    const team = await this.teamService.getById(id);
    const profileIds = (team?.profiles as Types.ObjectId[]) || [];

    return this.profileService.getByIds(profileIds);
  }

  @Post(':id/profiles')
  @Roles(UserRole.TEAM_MANAGER)
  @UseGuards(TeamGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminCreateTeamProfileResponse })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async createTeamProfile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: AdminCreateProfileBodyRequest,
  ) {
    const createProfileDto = profileMapper.bodyRequestToCreateDto(body);
    const user = req.user;

    return this.adminService.createTeamProfile(
      new Types.ObjectId(id),
      createProfileDto,
      file,
      user,
    );
  }

  @Put(':id/profiles/:profileId')
  @Roles(UserRole.TEAM_MANAGER)
  @UseGuards(TeamGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminUpdateTeamProfileResponse })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async updateTeamProfile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('profileId') profileId: string,
    @Body() body: AdminUpdateProfileBodyRequest,
  ) {
    const updateProfileDto = profileMapper.bodyRequestToCreateDto(body);
    const user = req.user;

    return this.adminService.updateProfile(
      new Types.ObjectId(profileId),
      updateProfileDto,
      file,
      user,
    );
  }

  @Delete(':id/profiles/:profileId')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @UseGuards(TeamGuard)
  @ApiResponse({ status: 200, type: AdminDeleteTeamProfileResponse })
  @ApiBearerAuth()
  async deleteProfile(@Req() req, @Param('profileId') profileId: string) {
    const user = req.user;

    return this.adminService.deleteTeamProfile(
      new Types.ObjectId(profileId),
      user,
    );
  }
}
