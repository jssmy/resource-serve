import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSION_META_KEY } from 'src/commons/decoratos/set-policies/set-policies.decorator';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const [permissionrRequired] = this.reflector.get<string>(
      PERMISSION_META_KEY,
      context.getHandler(),
    );

    if (!permissionrRequired) {
      throw new InternalServerErrorException(
        'Policy permission not stablished',
      );
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) {
      throw new InternalServerErrorException(
        'User is not setting, please check config API',
      );
    }

    return user.role.permissions.some(
      (permission) => permission.id === permissionrRequired,
    );
  }
}
