import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(48)
  @Matches(/^[a-zA-Z]$/, {
    message: 'name must contain only letters.',
  })
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, {
    message: 'invalid e-mail.',
  })
  email: string;

  @IsString()
  @Matches(/(\(\d{2}\)\s)(\d{4,5}\-\d{4})/, {
    message: 'invalid phone',
  })
  phone: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])$/, {
    message:
      'password must contain at least one upper case letter, one lower case letter, one number and one special character.',
  })
  password: string;
}
