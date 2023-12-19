import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from "./dto/login.dto";
import {JwtUser} from "../../core/models/jwt-user";
import {AuthUser} from "../../core/decorators/auth-user.decorator";
import {SkipAuth} from "../../core/guards/auth-guard";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  getProfile(@AuthUser() authUser: JwtUser) {
    console.log(authUser, 'getProfile');
    return {user: authUser};
  }

  @SkipAuth()
  @Get('free')
  authFree(@AuthUser() authUser: JwtUser) {
    console.log(authUser, 'authFree');
    return {user: 'Yok'};
  }
}
