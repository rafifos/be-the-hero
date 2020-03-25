import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthSignInDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, {
    message: 'E-mail inválido.',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Sua senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  })
  password: string;
}
