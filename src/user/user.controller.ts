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
import { CheckPolicies } from 'src/commons/guards/check-policies';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @CheckPolicies(TypePermissions.API)
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
  ) {
    page = page || 1;
    limit = limit || 10;
    return this.userService.findAll(page, limit);
  }


  @Get('/:id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    return this.userService.findOne(id);
  }


  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
