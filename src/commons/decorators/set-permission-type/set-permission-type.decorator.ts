import { SetMetadata } from '@nestjs/common';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';

export const KEY_DECORATOR_TYPE_PERMISSION = 'set-permission-type';
export const SetPermissionType = (type: TypePermissions) => SetMetadata(KEY_DECORATOR_TYPE_PERMISSION, type);
