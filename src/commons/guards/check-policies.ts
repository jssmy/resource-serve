import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetPolicies } from '../decoratos/set-policies/set-policies.decorator';
import { PolicyGuard } from './policy/policy.guard';

export function CheckPolicies<T>(policy: T) {
  return applyDecorators(
    SetPolicies<T>(policy),
    UseGuards(AuthGuard('jwt-access'), PolicyGuard),
  );
}
