import { IsEmpty } from 'class-validator';

export class CreateHistoryRewardDto {
  @IsEmpty()
  public user: string;
  public reward: string;
}
