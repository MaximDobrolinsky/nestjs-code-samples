import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  imageKey: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
SkillSchema.index({ title: 1 });
