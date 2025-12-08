import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SuccessHandle } from '@commons/classes/success.handle';
import { Auth } from '@commons/guards/auth';
import { CheckPolicies } from '@commons/guards/check-policies';
import { TypePermissions } from '@permissions/types/type-permissions.type';
import { GetUser } from '@user/decoratos/get-user.decorator';
import { User } from '@user/entities/user.entity';

@Controller('control-access')
export class ControlAccessController {
  @Post()
  @Auth()
  @CheckPolicies(TypePermissions.MENU, TypePermissions.OPTION)
  @HttpCode(HttpStatus.OK)
  hasValidAuth() {
    return new SuccessHandle('Acceso autorizado exitosamente');
  }

  @Get('permissions')
  @Auth()
  getPermissionAuth(@GetUser() user: User) {
    return user.role.permissions.filter(
      (permission) => permission.type !== TypePermissions.API,
    );
  }
}
