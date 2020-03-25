import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthSignInDTO } from './dto/auth-sign-in.dto';
import { AuthSignUpDTO } from './dto/auth-sign-up.dto';
import { ONG } from './ong.entity';

@EntityRepository(ONG)
export class ONGRepository extends Repository<ONG> {
  async signUp(authSignUpDTO: AuthSignUpDTO): Promise<void> {
    const { name, email, phone, password } = authSignUpDTO;
    const ong = new ONG();

    ong.name = name;
    ong.email = email;
    ong.phone = phone;
    ong.salt = await bcrypt.genSalt();
    ong.password = await this.hashPassword(password, ong.salt);

    try {
      await ong.save();
    } catch (error) {
      if (error.errno === 19) {
        throw new ConflictException('ONG já está cadastrada.');
      } else {
        throw new InternalServerErrorException(
          'Ocorreu um erro ao criar o seu cadastro, tente novamente mais tarde.',
        );
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateONGPassword(authSignInDTO: AuthSignInDTO): Promise<string> {
    const { email, password } = authSignInDTO;
    const ong = await this.findOne({ email });

    if (ong && (await ong.validatePassword(password))) {
      return ong.name;
    } else {
      return null;
    }
  }
}
