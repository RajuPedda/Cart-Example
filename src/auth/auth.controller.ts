import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';
import { LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    debugger;
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    };
    const token = await this.authService.sign(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: any) {
    console.log(userDTO.username);
    debugger;
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    };
    const token = await this.authService.sign(payload);
    return { user, token };
  }
}
