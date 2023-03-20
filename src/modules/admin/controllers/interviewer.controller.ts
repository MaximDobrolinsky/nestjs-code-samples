import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  AdminCreateInterviewerResponse,
  AdminDeleteInterviewerResponse,
  AdminGetAllInterviewersResponse,
  AdminGetByIdInterviewerResponse,
  AdminUpdateInterviewerResponse,
} from '../interfaces/admin-response.interface';
import {
  AdminCreateInterviewerBodyRequest,
  AdminUpdateInterviewerBodyRequest,
} from '../interfaces/admin-request.interface';

import {
  InterviewerService,
  CreateInterviewerDto,
  UpdateInterviewerDto,
} from '../../../@core/modules/interviewer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from '../admin.service';
import { UserRole } from '../../../@core/modules/user/user.enum';

@Controller('admin/interviewer')
@ApiTags('Admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class InterviewerController {
  constructor(
    private readonly interviewerService: InterviewerService,
    private readonly adminService: AdminService,
  ) {}

  @Get('')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, type: [AdminGetAllInterviewersResponse] })
  @ApiBearerAuth()
  async getAllInterviewers() {
    return this.interviewerService.getAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, type: AdminGetByIdInterviewerResponse })
  @ApiBearerAuth()
  async getInterviewerById(@Param('id') id: string) {
    return this.interviewerService.getById(id);
  }

  @Post('')
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminCreateInterviewerResponse })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async createInterviewer(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AdminCreateInterviewerBodyRequest,
  ) {
    return this.adminService.createInterviewer(file, {
      name: body.name,
      position: body.position,
    });
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminUpdateInterviewerResponse })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async updateInterviewer(
    @Param('id') id,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AdminUpdateInterviewerBodyRequest,
  ) {
    return this.adminService.updateInterviewer(file, id, body);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, type: AdminDeleteInterviewerResponse })
  @ApiBearerAuth()
  async deleteInterviewer(@Param('id') id) {
    return this.adminService.removeInterviewer(id);
  }
}
