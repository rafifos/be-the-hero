import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthSignUpDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(48)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, {
    message: 'E-mail inválido.',
  })
  email: string;

  @IsString()
  @Matches(/(\(\d{2}\)\s)(\d{4,5}\-\d{4})/, {
    message: 'Telefone inválido.',
  })
  phone: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Sua senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  })
  password: string;
}
