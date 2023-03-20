import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

import { TrackAction } from './track.enum';
import { TrackObject } from './track.interface';

export type TrackDocument = Track & Document;

@Schema({ timestamps: true })
export class Track {
  @ApiProperty()
  @Prop()
  action: TrackAction;

  @ApiProperty()
  @Prop()
  oldValue: string;

  @ApiProperty()
  @Prop()
  newValue: string;

  @ApiProperty({ type: TrackObject })
  @Prop({ type: TrackObject })
  origin: TrackObject;

  @ApiProperty({ type: TrackObject })
  @Prop({ type: TrackObject })
  consumer: TrackObject;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
TrackSchema.index({ action: 1 });
TrackSchema.index({ 'origin.id': 1 });
TrackSchema.index({ 'consumer.id': 1 });
