import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ONGRepository } from './ong.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ONGRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
