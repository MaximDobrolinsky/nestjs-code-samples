import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Interviewer } from '../interviewer';
import { Skill } from '../skill';
import { ProfileInterviewType } from './profile.enum';

export class ProfileLanguageLevel {
  @ApiProperty()
  en: string;
}

export class ProfileSkill {
  @ApiProperty({ type: Skill })
  skill: Skill | Types.ObjectId;

  @ApiProperty()
  yearsOfExperience: number;
}

export class ProfileInterview {
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

  @ApiProperty({ type: Interviewer })
  interviewer: Interviewer | Types.ObjectId;
}

export class ProfileInternalReview {
  @ApiProperty()
  softSkill: string;

  @ApiProperty()
  hardSkill: string;
}

export class ProfileInternalExperience {
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

export class ProfileWorkExperience {
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

  @ApiProperty({ type: Skill, isArray: true })
  skills: Skill[] | Types.ObjectId[];
}

export class ProfileEducation {
  @ApiProperty()
  title: string;

  @ApiProperty()
  educationBase: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}

export class ProfileClientReview {
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

export class GetAllProfileOptions {
  title?: string;
  currentStack?: Types.ObjectId[];
  otherStack?: Types.ObjectId[];
  level?: string;
  yearsOfExperience?: number;
  'language.en'?: string;
  commitment?: string;
  location?: string;
  avaliability?: string;
  status?: string;
}
