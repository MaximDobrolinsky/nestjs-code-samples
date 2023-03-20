import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import mongoose, { Document, Types } from 'mongoose';
import { Profile } from '../profile';
import { User } from '../user';

export type TeamDocument = Team & Document;

@Schema({ timestamps: true })
export class Team {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty({ type: Profile, isArray: true })
  @Prop([
    {
      type: mongoose.Schema.Types.Mixed,
      ref: Profile.name,
    },
  ])
  @Type(() => Profile)
  profiles: Types.ObjectId[] | Profile[];

  @ApiProperty({ type: User })
  @Prop({
    type: mongoose.Schema.Types.Mixed,
    ref: User.name,
  })
  @Type(() => User)
  manager: User;

  @ApiProperty()
  @Prop()
  websiteLink: string;

  @ApiProperty()
  @Prop()
  country: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
