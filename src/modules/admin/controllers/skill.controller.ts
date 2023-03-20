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
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../../../@core/modules/auth';
import { Roles } from '../../../@core/decorators';
import { RoleGuard } from '../../../@core/guards/role.guard';
import {
  AdminCreateSkillResponse,
  AdminDeleteSkillResponse,
  AdminGetAllSkillsResponse,
  AdminGetByIdSkillResponse,
  AdminUpdateSkillResponse,
} from '../interfaces/admin-response.interface';
import {
  AdminCreateSkillBodyRequest,
  AdminUpdateSkillBodyRequest,
} from '../interfaces/admin-request.interface';

import {
  SkillService,
  CreateSkillDto,
  UpdateSkillDto,
} from '../../../@core/modules/skill';
import { AdminService } from '../admin.service';
import { UserRole } from '../../../@core/modules/user/user.enum';

@Controller('admin/skill')
@ApiTags('Admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class SkillController {
  constructor(
    private readonly skillService: SkillService,
    private readonly adminService: AdminService,
  ) {}

  @Get('')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [AdminGetAllSkillsResponse] })
  async getAll() {
    return this.skillService.getAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @ApiResponse({ status: 200, type: AdminGetByIdSkillResponse })
  @ApiBearerAuth()
  async getById(@Param('id') id: string) {
    return this.skillService.getById(id);
  }

  @Post('')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminCreateSkillResponse })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AdminCreateSkillBodyRequest,
  ) {
    return this.adminService.createSkill(file, body);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminUpdateSkillResponse })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AdminUpdateSkillBodyRequest,
  ) {
    return this.adminService.updateSkill(file, id, body);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @ApiResponse({ status: 200, type: AdminDeleteSkillResponse })
  @ApiBearerAuth()
  async delete(@Param('id') id) {
    return this.adminService.removeSkill(id);
  }
}
