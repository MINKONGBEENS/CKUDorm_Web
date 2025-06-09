import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireAdmin = this.reflector.get<boolean>('requireAdmin', context.getHandler());
    if (!requireAdmin) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const student = request.user;
    return student?.isAdmin === true;
  }
} 