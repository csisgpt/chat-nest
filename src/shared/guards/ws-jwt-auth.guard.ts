import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const authHeader = client.handshake?.headers?.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing auth token');
    }
    const [, token] = authHeader.split(' ');
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      client.data.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
