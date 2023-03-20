import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type InterviewerDocument = Interviewer & Document;

@Schema({ timestamps: true })
export class Interviewer {
  @ApiProperty()
  @Prop()
  imageKey: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  position: string;
}

export const InterviewerSchema = SchemaFactory.createForClass(Interviewer);
InterviewerSchema.index({ name: 1 });
InterviewerSchema.index({ position: 1 });
