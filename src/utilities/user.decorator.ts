import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(req => req.user);
