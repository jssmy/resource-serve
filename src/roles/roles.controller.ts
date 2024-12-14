import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CheckPolicies } from 'src/commons/guards/check-policies';
import { RolePolicy } from 'src/commons/policies/role.policy';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @CheckPolicies(TypePermissions.API)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @CheckPolicies(TypePermissions.API)
  findAllActive() {
    return this.rolesService.findAllActive();
  }

  @Get(':id')
  @CheckPolicies(TypePermissions.API)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies(TypePermissions.API)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @CheckPolicies(TypePermissions.API)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
