import {Body, Controller, Get, HttpCode, Request, HttpStatus, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginDto} from "./dto/login.dto";
import {AuthGuard, SkipAuth} from "../../core/guards/auth-guard.service";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
