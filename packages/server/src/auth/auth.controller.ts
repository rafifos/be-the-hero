import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDTO } from './dto/auth-sign-in.dto';
import { AuthSignUpDTO } from './dto/auth-sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body(ValidationPipe) authSignUpDTO: AuthSignUpDTO): Promise<void> {
    return this.authService.signUp(authSignUpDTO);
  }

  @Post('sign-in')
  signIn(
    @Body(ValidationPipe) authSignInDTO: AuthSignInDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authSignInDTO);
  }
}
