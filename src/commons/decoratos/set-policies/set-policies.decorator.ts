import { SetMetadata } from '@nestjs/common';
export const PERMISSION_META_KEY = 'set-permission-policy';
export const SetPolicies = <T>(...args: T[]) =>
  SetMetadata(PERMISSION_META_KEY, args);
