import { ProfileStatus } from './profile.enum';
import {
  ProfileLanguageLevel,
  ProfileClientReview,
  ProfileEducation,
  ProfileInternalExperience,
  ProfileInternalReview,
  ProfileInterview,
  ProfileSkill,
  ProfileWorkExperience,
} from './profile.interface';

export class CreateProfileDto {
  name: string;
  imageKey?: string;
  title?: string;
  level?: string;
  languageLevel?: ProfileLanguageLevel;
  yearsOfExperience?: number;
  location?: string;
  timezone?: string;
  avaliability?: string;
  commitment?: string;
  currentStack?: ProfileSkill[];
  otherStack?: ProfileSkill[];
  interviews?: ProfileInterview[];
  internalReview?: ProfileInternalReview;
  internalExperience?: ProfileInternalExperience;
  workExperience?: ProfileWorkExperience[];
  educations?: ProfileEducation[];
  clientsReviews?: ProfileClientReview[];
  status?: ProfileStatus;
  note?: string;
}

export class UpdateProfileDto {
  name: string;
  imageKey?: string;
  title?: string;
  level?: string;
  languageLevel?: ProfileLanguageLevel;
  yearsOfExperience?: number;
  location?: string;
  timezone?: string;
  avaliability?: string;
  commitment?: string;
  currentStack?: ProfileSkill[];
  otherStack?: ProfileSkill[];
  interviews?: ProfileInterview[];
  internalReview?: ProfileInternalReview;
  internalExperience?: ProfileInternalExperience;
  workExperience?: ProfileWorkExperience[];
  educations?: ProfileEducation[];
  clientsReviews?: ProfileClientReview[];
  status?: ProfileStatus;
  note?: string;
}
