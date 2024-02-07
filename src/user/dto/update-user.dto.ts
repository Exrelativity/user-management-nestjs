import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  isEmailVerified?: boolean;

  @IsOptional()
  @MinLength(6)
  password?: string;
}
