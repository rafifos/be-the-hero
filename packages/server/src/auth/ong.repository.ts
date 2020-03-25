import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { ONG } from './ong.entity';

@EntityRepository(ONG)
export class ONGRepository extends Repository<ONG> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { name, email, phone, password } = authCredentialsDTO;
    const ong = new ONG();

    ong.name = name;
    ong.email = email;
    ong.phone = phone;
    ong.salt = await bcrypt.genSalt();
    ong.password = await this.hashPassword(password, ong.salt);

    try {
      await ong.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
