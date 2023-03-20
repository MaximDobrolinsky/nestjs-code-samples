import { ApiProperty } from '@nestjs/swagger';
import { Skill } from '../../../@core/modules/skill';
import { Profile } from '../../../@core/modules/profile';
import { Interviewer } from '../../../@core/modules/interviewer';
import { Team } from '../../../@core/modules/team';
import { User } from '../../../@core/modules/user';

export class AdminLoginResponse {
  @ApiProperty()
  token: string;
}

export class AdminGetAllSkillsResponse extends Skill {}
export class AdminGetByIdSkillResponse extends Skill {}
export class AdminCreateSkillResponse extends Skill {}
export class AdminUpdateSkillResponse extends Skill {}
export class AdminDeleteSkillResponse extends Skill {}

export class AdminGetAllProfileResponse extends Profile {}
export class AdminCreateProfileResponse extends Profile {}
export class AdminUpdateProfileResponse extends Profile {}
export class AdminDeleteProfileResponse extends Profile {}

export class AdminGetAllInterviewersResponse extends Interviewer {}
export class AdminGetByIdInterviewerResponse extends Interviewer {}
export class AdminCreateInterviewerResponse extends Interviewer {}
export class AdminUpdateInterviewerResponse extends Interviewer {}
export class AdminDeleteInterviewerResponse extends Interviewer {}

export class AdminGetAllTeamsResponse extends Team {}
export class AdminGetByIdTeamResponse extends Team {}
export class AdminCreateTeamResponse extends Team {}
export class AdminUpdateTeamResponse extends Team {}
export class AdminDeleteTeamResponse extends Team {}

export class AdminGetAllUsersResponse extends User {}
export class AdminGetByIdUserResponse extends User {}
export class AdminCreateUserResponse extends User {}
export class AdminUpdateUserResponse extends User {}
export class AdminDeleteUserResponse extends User {}
export class AdminUpdateUserPasswordResponse extends User {}

export class AdminGetTeamProfilesResponse extends Profile {}
export class AdminCreateTeamProfileResponse extends Profile {}
export class AdminUpdateTeamProfileResponse extends Profile {}
export class AdminDeleteTeamProfileResponse extends Profile {}
