import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PolicyGuard } from './policy/policy.guard';
import { SetPermissionType } from '../decorators/set-permission-type/set-permission-type.decorator';
import { TypePermissions } from '@permissions/types/type-permissions.type';

export function CheckPolicies(...type: TypePermissions[]) {
  return applyDecorators(
    SetPermissionType(...type),
    UseGuards(AuthGuard('jwt-access'), PolicyGuard),
  );
}
