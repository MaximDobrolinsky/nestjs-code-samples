import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService, JwtAuthGuard } from '../../../@core/modules/auth';
import { Public } from '../../../@core/decorators';
import { RoleGuard } from '../../../@core/guards/role.guard';
import { PlatformLoginBodyRequest, PlatformLoginResponse } from '../interfaces';

@Controller('platform')
@ApiTags('Platform')
@UseGuards(JwtAuthGuard, RoleGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @Public()
  @ApiResponse({ status: 200, type: PlatformLoginResponse })
  async login(@Body() body: PlatformLoginBodyRequest) {
    return this.authService.login(body.username, body.password);
  }
}
