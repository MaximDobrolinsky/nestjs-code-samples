import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Track, TrackSchema } from './track.schema';
import { TrackService } from './track.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
