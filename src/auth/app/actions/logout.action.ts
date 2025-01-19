import { Controller, Post, Req } from '@nestjs/common';

@Controller('auth')
export class logoutAction {
  constructor() {}

  @Post('logout')
    apply(@Req() req: any) {
      req.logout(); // Invalidate session or tokens as needed
      return { message: 'Logged out successfully' };
    }
  }
  