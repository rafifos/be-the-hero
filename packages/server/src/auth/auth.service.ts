import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { ONGRepository } from './ong.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ONGRepository)
    private ongRepotory: ONGRepository,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.ongRepotory.signUp(authCredentialsDTO);
  }
}
