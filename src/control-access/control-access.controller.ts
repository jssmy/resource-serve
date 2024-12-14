import { Controller, Get, Header, HttpCode, HttpStatus, Post, Req, Response } from '@nestjs/common';
import { SuccessHandle } from 'src/commons/classes/success.handle';
import { GetRefererPath } from 'src/commons/decorators/get-refer-path/get-referer-path.decorator';
import { Auth } from 'src/commons/guards/auth';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('control-access')
export class ControlAccessController {



    @Post('page')
    @Auth()
    hasAccessToPage(
        @GetUser() user: User,
        @GetRefererPath() refererPath: string
    ) {

    }

    @Post()
    @Auth()
    @HttpCode(HttpStatus.OK)
    hasValidAuth() {
        return new SuccessHandle('Success auth access');
    }


    @Get('permissions')
    @Auth()
    getPermissionAuth(
        @GetUser() user: User
    ) {
        return user.role.permissions.filter(permission => permission.type !== TypePermissions.API);
    }
}
