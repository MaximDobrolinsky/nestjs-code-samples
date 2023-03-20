export class CreateInterviewerDto {
  imageKey: string;
  name: string;
  position: string;
}

export class UpdateInterviewerDto {
  imageKey?: string;
  name?: string;
  position?: string;
}
