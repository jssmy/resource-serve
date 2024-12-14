import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CheckPolicies } from 'src/commons/guards/check-policies';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    @CheckPolicies(TypePermissions.API)
    findAll() {
        return this.userService.findAll();
    }


    @Post()
    @CheckPolicies(TypePermissions.API)
    create(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.userService.create(createUserDto);
    }
}
