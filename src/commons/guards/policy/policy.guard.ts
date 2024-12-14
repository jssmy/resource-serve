import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { use } from 'passport';
import { Observable } from 'rxjs';
import { KEY_DECORATOR_TYPE_PERMISSION } from 'src/commons/decorators/set-permission-type/set-permission-type.decorator';
import { matchRoute, trim } from 'src/commons/utils/string.util';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PolicyGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    context.switchToHttp().getRequest();
    
    

    const type: TypePermissions = this.reflector.get<TypePermissions>(KEY_DECORATOR_TYPE_PERMISSION, context.getHandler());

    const request = context.switchToHttp().getRequest();

    const URL = `/${trim(request.url, '/')}`;

    const user: User = request.user;


    const permissions = [...user.role.permissions.flat()].filter(permission => permission.type === type);
    


    

    if (!user) {
      throw new InternalServerErrorException(
        'User is not setting, please check config API',
      );
    }

    const routes = permissions.map(permission => `/${trim(permission.route, '/')}`);
    
    return matchRoute(URL, routes);
  }
}
