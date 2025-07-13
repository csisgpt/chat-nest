import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtPayload } from './jwt-payload.interface';
import { Socket } from 'socket.io';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // HTTP request
    if (context.getType<string>() === 'http') {
      const request = context.switchToHttp().getRequest();
      const user = (request.user as JwtPayload & { role?: string }) || null;
      if (!user) {
        throw new UnauthorizedException();
      }
      if (!requiredRoles.includes((user as any).role)) {
        throw new ForbiddenException();
      }
      return true;
    }

    // WebSocket
    const client: Socket = context.switchToWs().getClient();
    const user = (client.data.user as JwtPayload & { role?: string }) || null;
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!requiredRoles.includes((user as any).role)) {
      throw new ForbiddenException();
    }
    return true;
  }
}
