import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Interviewer } from '../interviewer';
import { Skill } from '../skill';
import { ProfileStatus } from './profile.enum';
import {
  ProfileClientReview,
  ProfileEducation,
  ProfileInternalExperience,
  ProfileInternalReview,
  ProfileInterview,
  ProfileLanguageLevel,
  ProfileSkill,
  ProfileWorkExperience,
} from './profile.interface';

export type ProfileDocument = Profile & Document;
@Schema({ timestamps: true })
export class Profile {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  imageKey: string;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  level: string;

  @ApiProperty({ type: ProfileLanguageLevel })
  @Prop({ type: ProfileLanguageLevel })
  languageLevel: ProfileLanguageLevel;

  @ApiProperty()
  @Prop()
  yearsOfExperience: number;

  @ApiProperty()
  @Prop()
  location: string;

  @ApiProperty()
  @Prop()
  timezone: string;

  @ApiProperty()
  @Prop()
  avaliability: string;

  @ApiProperty()
  @Prop()
  commitment: string;

  @ApiProperty({ type: ProfileSkill, isArray: true })
  @Prop({
    type: mongoose.Schema.Types.Mixed,
    ref: Skill.name,
  })
  @Type(() => ProfileSkill)
  currentStack: ProfileSkill[];

  @ApiProperty({ type: ProfileSkill, isArray: true })
  @Prop({
    type: mongoose.Schema.Types.Mixed,
    ref: Skill.name,
  })
  @Type(() => ProfileSkill)
  otherStack: ProfileSkill[];

  @ApiProperty({ type: ProfileInterview, isArray: true })
  @Prop({ type: ProfileInterview, ref: Interviewer.name })
  @Type(() => ProfileInterview)
  interviews: ProfileInterview[];

  @ApiProperty({ type: ProfileInternalReview })
  @Prop({ type: ProfileInternalReview })
  internalReview: ProfileInternalReview;

  @ApiProperty({ type: ProfileInternalExperience })
  @Prop({ type: ProfileInternalExperience })
  internalExperience: ProfileInternalExperience;

  @ApiProperty({ type: ProfileWorkExperience, isArray: true })
  @Prop({ type: [{ type: mongoose.Schema.Types.Mixed, ref: Skill.name }] })
  @Type(() => ProfileWorkExperience)
  workExperience: ProfileWorkExperience[];

  @ApiProperty({ type: ProfileEducation, isArray: true })
  @Prop({ type: ProfileEducation })
  educations: ProfileEducation[];

  @ApiProperty({ type: ProfileClientReview, isArray: true })
  @Prop({ type: ProfileClientReview })
  clientsReviews: ProfileClientReview[];

  @ApiProperty({ enum: ProfileStatus })
  @Prop({ enum: ProfileStatus })
  status: ProfileStatus;

  @ApiProperty()
  @Prop()
  note: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
ProfileSchema.index({ title: 1 });
ProfileSchema.index({ 'currentStack.skill': 1 });
ProfileSchema.index({ 'otherStack.skill': 1 });
ProfileSchema.index({ level: 1 });
ProfileSchema.index({ yearsOfExperience: 1 });
ProfileSchema.index({ 'languageLevel.en': 1 });
ProfileSchema.index({ commitment: 1 });
ProfileSchema.index({ location: 1 });
ProfileSchema.index({ avaliability: 1 });
ProfileSchema.index({ status: 1 });
