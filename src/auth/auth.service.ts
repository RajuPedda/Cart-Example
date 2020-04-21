import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signPayload(payload: Payload) {
    // return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
