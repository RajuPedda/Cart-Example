import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async sign(payload: Payload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }

  /*  async validateUserLocal(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  } */
}
