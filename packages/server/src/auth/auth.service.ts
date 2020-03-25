import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignInDTO } from './dto/auth-sign-in.dto';
import { AuthSignUpDTO } from './dto/auth-sign-up.dto';
import { JwtPayload } from './jwt-payload';
import { ONGRepository } from './ong.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ONGRepository)
    private ongRepository: ONGRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDTO: AuthSignUpDTO): Promise<void> {
    return this.ongRepository.signUp(authSignUpDTO);
  }

  async signIn(authSignInDTO: AuthSignInDTO): Promise<{ accessToken: string }> {
    const name = await this.ongRepository.validateONGPassword(authSignInDTO);

    if (!name) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload: JwtPayload = { name };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
