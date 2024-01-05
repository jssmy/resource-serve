import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_PERMISSION } from 'src/auth/decorators/set-permissions/set-permissions.decorator';
import { UserGrant } from 'src/commons/types/user-grant';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: UserGrant[] = this.reflector.get(META_PERMISSION, context.getHandler()) || [];

    if (!roles.length) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user: User = req.user;

    if (!user) {
      throw new InternalServerErrorException('User was not setting');
    }

    return roles.some(role => user.userGrant === role);
  }
}
