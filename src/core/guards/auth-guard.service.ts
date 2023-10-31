import {CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {AsyncLocalStorage} from "async_hooks";
import {JwtUser} from "../models/jwt-user";


const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector, private readonly als: AsyncLocalStorage<JwtUser>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: 'DO NOT USE OUTSIDE OF THE SOURCE CODE.',
          }
      );
      this.als.enterWith(payload);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
