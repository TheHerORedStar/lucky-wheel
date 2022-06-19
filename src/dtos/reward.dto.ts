import { IsNotEmpty } from 'class-validator';

export class CreateRewardDto {
  @IsNotEmpty()
  public name: string;
}
