// src/user/user.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from '../common/guard/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @UseGuards(SupabaseAuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return {
      message: 'Authenticated user',
      user: req['user'],
    };
  }
}
