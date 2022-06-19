import { IsEmail, IsString, Length } from 'class-validator';
export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class SignUpDto {
  @IsEmail()
  public email: string;

  @Length(6, 30)
  @IsString()
  public password?: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}
