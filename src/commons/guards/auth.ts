import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserGrant } from 'src/commons/types/user-grant';
import { SetPermissions } from '../decorators/set-permissions/set-permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from './permissions/permissions.guard';

export function Auth(...roles: UserGrant[]) {
  return applyDecorators(
    SetPermissions(...roles),
    UseGuards(AuthGuard('jwt-access'), PermissionsGuard),
  );
}
