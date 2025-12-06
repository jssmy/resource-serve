import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SuccessHandle } from 'src/commons/classes/success.handle';
import { Auth } from 'src/commons/guards/auth';
import { CheckPolicies } from 'src/commons/guards/check-policies';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

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
