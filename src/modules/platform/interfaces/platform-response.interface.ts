import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/@core/modules/profile';

export class PlatformLoginResponse {
  @ApiProperty()
  token: string;
}

export class PlatformGetAllProfileResponse extends Profile {}
