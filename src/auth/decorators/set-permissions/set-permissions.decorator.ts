import { SetMetadata } from '@nestjs/common';
import { UserGrant } from 'src/commons/types/user-grant';
export const META_PERMISSION = 'set-permissions';

export const SetPermissions = (...args: UserGrant[]) => SetMetadata(META_PERMISSION, args);
