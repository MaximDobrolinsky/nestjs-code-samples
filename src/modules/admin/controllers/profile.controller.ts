import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  AdminCreateProfileResponse,
  AdminDeleteProfileResponse,
  AdminGetAllProfileResponse,
  AdminUpdateProfileResponse,
} from '../interfaces/admin-response.interface';
import {
  AdminCreateProfileBodyRequest,
  AdminGetAllProfileQuery,
  AdminUpdateProfileBodyRequest,
} from '../interfaces/admin-request.interface';
import { ProfileService } from '../../../@core/modules/profile';
import { profileMapper } from '../mappers';
import { UserRole } from '../../../@core/modules/user/user.enum';
import { TrackService } from '../../../@core/modules/track';
import { AdminService } from '../admin.service';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/profile')
@ApiTags('Admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly adminService: AdminService,
  ) {}

  @Get('')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @ApiResponse({ status: 200, type: [AdminGetAllProfileResponse] })
  @ApiBearerAuth()
  async getAllProfile(@Query() query: AdminGetAllProfileQuery) {
    return this.profileService.getAllWithOptions({
      status: query?.status,
    });
  }

  @Post('')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminCreateProfileResponse })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async createProfile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AdminCreateProfileBodyRequest,
  ) {
    const createdProfileDto = profileMapper.bodyRequestToCreateDto(body);
    const user = req.user;

    return this.adminService.createProfile(createdProfileDto, file, user);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminUpdateProfileResponse })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async updateProfile(
    @Req() req,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AdminUpdateProfileBodyRequest,
  ) {
    const createProfileDto = profileMapper.bodyRequestToCreateDto(body);
    const user = req.user;

    return this.adminService.updateProfile(
      new Types.ObjectId(id),
      createProfileDto,
      file,
      user,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @ApiResponse({ status: 200, type: AdminDeleteProfileResponse })
  @ApiBearerAuth()
  async deleteProfile(@Req() req, @Param('id') id: string) {
    const user = req.user;

    return this.adminService.deleteProfile(new Types.ObjectId(id), user);
  }
}
