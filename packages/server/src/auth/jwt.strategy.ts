import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload';
import { ONG } from './ong.entity';
import { ONGRepository } from './ong.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(ONGRepository)
    private ongRepository: ONGRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '685327c3-e837-40ad-808d-233d50b2082d',
    });
  }

  async validate(payload: JwtPayload): Promise<ONG> {
    const { name } = payload;
    const ong = await this.ongRepository.findOne({ name });

    if (!ong) {
      throw new UnauthorizedException();
    }

    return ong;
  }
}
