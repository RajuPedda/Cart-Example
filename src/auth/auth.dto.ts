import { Address } from '../types/user';

export class LoginDTO {
  username: string;
  password: string;
}

export class RegisterDTO {
  username: string;
  password: string;
  seller?: boolean;
  address?: Address;
}
