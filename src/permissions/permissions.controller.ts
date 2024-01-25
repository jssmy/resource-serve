import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CheckPolicies } from 'src/commons/guards/check-policies';
import { PermissionPolicy } from 'src/policies/permission.policy';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @CheckPolicies<PermissionPolicy>(PermissionPolicy.CREATE)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @CheckPolicies<PermissionPolicy>(PermissionPolicy.FIND_ALL)
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @CheckPolicies<PermissionPolicy>(PermissionPolicy.FIND_ONE)
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies<PermissionPolicy>(PermissionPolicy.UPDATE)
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @CheckPolicies<PermissionPolicy>(PermissionPolicy.UPDATE)
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
