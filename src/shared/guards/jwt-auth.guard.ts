import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: unknown, user: JwtPayload, info: unknown, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const req = context.switchToHttp().getRequest();
    if (req) {
      req.user = user;
    }
    return user;
  }
}
