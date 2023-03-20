import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { UserRole, UserStatus } from './user.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop({
    default: UserRole.OPERATION,
  })
  role: string;

  @ApiProperty({ enum: UserStatus })
  @Prop({ enum: UserStatus })
  status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 });
UserSchema.index({ name: 1 });
