import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole, UserStatus } from '../../../@core/modules/user/user.enum';
import {
  ProfileInterviewType,
  ProfileStatus,
} from '../../../@core/modules/profile/profile.enum';

export class AdminLoginBodyRequest {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class AdminCreateSkillBodyRequest {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image: Express.Multer.File;
}

export class AdminUpdateSkillBodyRequest {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image?: Express.Multer.File;
}

class ProfileSkillRequest {
  @ApiProperty()
  skill: string;
  @ApiProperty()
  yearsOfExperience: number;
}

class ProfileInterviewRequest {
  @ApiProperty({ enum: ProfileInterviewType })
  type: ProfileInterviewType;

  @ApiProperty()
  title: string;

  @ApiProperty()
  videoLink: string;

  @ApiProperty()
  shortSummary: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  interviewer: string;
}

class ProfileInternalReviewRequest {
  @ApiProperty()
  softSkill: string;

  @ApiProperty()
  hardSkill: string;
}

class ProfileInternalExperienceRequest {
  @ApiProperty()
  codeQuality: number;

  @ApiProperty()
  productivity: number;

  @ApiProperty()
  communication: number;

  @ApiProperty()
  reliabilityAndConsistency: number;

  @ApiProperty()
  leadership: number;
}

class ProfileWorkExperienceRequest {
  @ApiProperty()
  title: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  responsobilies: string;

  @ApiProperty()
  team: string;

  @ApiProperty({ isArray: true })
  skills: string[];
}

class ProfileEducationRequest {
  @ApiProperty()
  title: string;

  @ApiProperty()
  educationBase: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}

class ProfileClientReviewReqquest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  imageKey: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  linkedInUrl: string;
}

export class AdminCreateProfileBodyRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  level?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  englishLevel?: string;

  @ApiProperty()
  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => +value)
  yearsOfExperience?: number;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  timezone?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  avaliability?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  commitment?: string;

  @ApiProperty({ type: ProfileSkillRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  currentStack?: ProfileSkillRequest[];

  @ApiProperty({ type: ProfileSkillRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  otherStack?: ProfileSkillRequest[];

  @ApiProperty({ type: ProfileInterviewRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  interviews?: ProfileInterviewRequest[];

  @ApiProperty({ type: ProfileInternalReviewRequest })
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  internalReview?: ProfileInternalReviewRequest;

  @ApiProperty({ type: ProfileInternalExperienceRequest })
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  internalExperience?: ProfileInternalExperienceRequest;

  @ApiProperty({ type: ProfileWorkExperienceRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  workExperience?: ProfileWorkExperienceRequest[];

  @ApiProperty({ type: ProfileEducationRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  educations?: ProfileEducationRequest[];

  @ApiProperty({ type: ProfileClientReviewReqquest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  clientsReviews?: ProfileClientReviewReqquest[];
}

export class AdminUpdateProfileBodyRequest {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @ApiPropertyOptional()
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  level?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  englishLevel?: string;

  @ApiProperty()
  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => +value)
  yearsOfExperience?: number;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  timezone?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  avaliability?: string;

  @ApiProperty()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  commitment?: string;

  @ApiProperty({ type: ProfileSkillRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  currentStack?: ProfileSkillRequest[];

  @ApiProperty({ type: ProfileSkillRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  otherStack?: ProfileSkillRequest[];

  @ApiProperty({ type: ProfileInterviewRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  interviews?: ProfileInterviewRequest[];

  @ApiProperty({ type: ProfileInternalReviewRequest })
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  internalReview?: ProfileInternalReviewRequest;

  @ApiProperty({ type: ProfileInternalExperienceRequest })
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  internalExperience?: ProfileInternalExperienceRequest;

  @ApiProperty({ type: ProfileWorkExperienceRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  workExperience?: ProfileWorkExperienceRequest[];

  @ApiProperty({ type: ProfileEducationRequest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  educations?: ProfileEducationRequest[];

  @ApiProperty({ type: ProfileClientReviewReqquest, isArray: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  clientsReviews?: ProfileClientReviewReqquest[];
}

export class AdminCreateInterviewerBodyRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;
}

export class AdminUpdateInterviewerBodyRequest {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image?: Express.Multer.File;
}

export class AdminGetAllProfileQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  status?: string = '';
}

export class AdminCreateTeamBodyRequest {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ isArray: true, required: true })
  @IsArray()
  profiles: string[];

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  manager?: string;

  @ApiProperty({ required: true })
  @IsString()
  websiteLink: string;

  @ApiProperty({ required: true })
  @IsString()
  country: string;
}

export class AdminUpdateTeamBodyRequest {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ isArray: true, required: false })
  @IsArray()
  @IsOptional()
  profiles?: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  manager?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  websiteLink?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  country?: string;
}

export class AdminCreateUserBodyRequest {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty({ required: true, enum: UserRole })
  @IsString()
  role: UserRole;

  @ApiProperty({ required: true, enum: UserStatus })
  @IsString()
  status: UserStatus;
}

export class AdminUpdateUserBodyRequest {
  @ApiProperty({ required: false })
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  username?: string;

  @ApiProperty({ required: false })
  @IsString()
  password?: string;

  @ApiProperty({ required: false, enum: UserRole })
  @IsString()
  role?: UserRole;

  @ApiProperty({ required: false, enum: UserStatus })
  @IsString()
  status?: UserStatus;
}

export class AdminUpdateUserPasswordBodyRequest {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}
