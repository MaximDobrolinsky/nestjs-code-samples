import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService, JwtAuthGuard } from '../../../@core/modules/auth';
import { Public } from '../../../@core/decorators';
import { RoleGuard } from '../../../@core/guards/role.guard';
import { AdminService } from '../admin.service';
import { AdminLoginResponse } from '../interfaces/admin-response.interface';
import { AdminLoginBodyRequest } from '../interfaces/admin-request.interface';

@Controller('admin')
@ApiTags('Admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {}

  @Post('auth/login')
  @Public()
  @ApiResponse({ status: 200, type: AdminLoginResponse })
  async login(@Body() body: AdminLoginBodyRequest) {
    return this.authService.login(body.username, body.password);
  }

  @Post('auth/create')
  @Public()
  async createAdmin() {
    return this.adminService.createAdminUser();
  }
}
