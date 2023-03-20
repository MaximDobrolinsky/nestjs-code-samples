import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TeamService } from '../modules/team';
import { UserRole } from '../modules/user/user.enum';

@Injectable()
export class TeamGuard implements CanActivate {
  constructor(private readonly teamService: TeamService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user,
      params: { id },
    } = context.switchToHttp().getRequest();

    if (user.role === UserRole.TEAM_MANAGER) {
      const team = await this.teamService.getById(id);
      if (team?.manager.toString() !== user._id) {
        throw new ForbiddenException('Forbidden');
      }
    }

    return true;
  }
}
