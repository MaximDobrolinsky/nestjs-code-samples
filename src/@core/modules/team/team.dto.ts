import { Types } from 'mongoose';

export class CreateTeamDto {
  name: string;
  description: string;
  profiles: Types.ObjectId[];
  manager: Types.ObjectId;
  websiteLink: string;
  country: string;
}

export class UpdateTeamDto {
  name?: string;
  description?: string;
  profiles?: Types.ObjectId[];
  manager?: Types.ObjectId;
  websiteLink?: string;
  country?: string;
}
