import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../@core/modules/auth';
import { Roles } from '../../../@core/decorators';
import { RoleGuard } from '../../../@core/guards/role.guard';

import {
  AdminCreateUserResponse,
  AdminDeleteUserResponse,
  AdminGetAllUsersResponse,
  AdminGetByIdUserResponse,
  AdminUpdateUserPasswordResponse,
  AdminUpdateUserResponse,
} from '../interfaces/admin-response.interface';
import { UpdateUserDto, UserService } from '../../../@core/modules/user';
import {
  AdminCreateUserBodyRequest,
  AdminUpdateUserBodyRequest,
  AdminUpdateUserPasswordBodyRequest,
} from '../interfaces/admin-request.interface';
import { UserRole } from '../../../@core/modules/user/user.enum';

@Controller('admin/user')
@ApiTags('Admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @ApiResponse({ status: 200, type: [AdminGetAllUsersResponse] })
  @ApiBearerAuth()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @ApiResponse({ status: 200, type: AdminGetByIdUserResponse })
  @ApiBearerAuth()
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Post('')
  @Roles(UserRole.ADMIN, UserRole.OPERATION)
  @ApiResponse({ status: 200, type: AdminCreateUserResponse })
  @ApiBearerAuth()
  async create(@Request() req, @Body() body: AdminCreateUserBodyRequest) {
    if (
      req.user.role === UserRole.OPERATION &&
      body.role !== UserRole.TEAM_MANAGER
    ) {
      throw new ForbiddenException('Operation can reate only team manager.');
    }

    return this.userService.createWithHashedPassword(body);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, type: AdminUpdateUserResponse })
  @ApiBearerAuth()
  async update(@Param('id') id, @Body() body: AdminUpdateUserBodyRequest) {
    return this.userService.update<UpdateUserDto>(id, body);
  }

  @Put(':id/password')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, type: AdminUpdateUserPasswordResponse })
  @ApiBearerAuth()
  async updatePassword(
    @Param('id') id,
    @Body() body: AdminUpdateUserPasswordBodyRequest,
  ) {
    return this.userService.updatePassword(
      id,
      body.oldPassword,
      body.newPassword,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, type: AdminDeleteUserResponse })
  @ApiBearerAuth()
  async delete(@Param('id') id) {
    return this.userService.delete(id);
  }
}
