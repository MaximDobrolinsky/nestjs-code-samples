import { TrackAction } from './track.enum';
import { TrackObject } from './track.interface';

export class CreateTrackDto {
  action: TrackAction;
  oldValue: string;
  newValue: string;
  origin: TrackObject;
  consumer: TrackObject;
}
