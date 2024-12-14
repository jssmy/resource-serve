import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CheckPolicies } from 'src/commons/guards/check-policies';
import { Auth } from 'src/commons/guards/auth';
import { PermissionPolicy } from 'src/commons/policies/permission.policy';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { TypePermissions } from './types/type-permissions.type';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  @CheckPolicies(TypePermissions.API)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @CheckPolicies(TypePermissions.API)
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @CheckPolicies(TypePermissions.API)
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies(TypePermissions.API)
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @CheckPolicies(TypePermissions.API)
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }

}
