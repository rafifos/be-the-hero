import { createParamDecorator } from '@nestjs/common';
import { ONG } from './ong.entity';

export const GetONG = createParamDecorator(
  (data, req): ONG => {
    return req.ong;
  },
);
