import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlatformLoginBodyRequest {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class PlatformGetAllProfileQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  specialization?: string = '';

  @ApiProperty({ isArray: true, type: String, required: false })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.length > 0 && value.split(','))
  techStack?: string[] = [];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  experienceLevel?: string = '';

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  yearsOfExperience?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  englishLevel?: string = '';

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  commitment?: string = '';

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readyToStart?: string = '';

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  hourlyRateFrom?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  hourlyRateTo?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  region?: string = '';
}
