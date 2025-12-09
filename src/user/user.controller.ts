import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CheckPolicies } from '@commons/guards/check-policies';
import { TypePermissions } from '@permissions/types/type-permissions.type';
import { ApiGetUsers, ApiGetUser, ApiDeleteUser } from '../config/doc';
import { get } from 'http';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @CheckPolicies(TypePermissions.API)
  @ApiGetUsers()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
  ) {
    page = page || 1;
    limit = limit || 10;
    return this.userService.findAll(page, limit);
  }

  @Get('/:id')
  @ApiGetUser()
  @CheckPolicies(TypePermissions.API)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @Get('public/:id')
  findPublicUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findWriter(id);
  }
  

  @Delete(':id')
  @ApiDeleteUser()
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
