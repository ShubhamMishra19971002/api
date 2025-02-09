import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    const token = authHeader.split(' ')[1]; // Extract token

    try {
      const decoded = this.jwtService.verify(token, { secret: 'qwertyuiop' }); // Change to your secret key
      request.user = decoded; // Attach user to request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
