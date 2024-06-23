import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;

  @IsEmpty()
  status: boolean;
}
