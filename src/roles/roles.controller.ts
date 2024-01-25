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
import { RolePolicy } from 'src/policies/role.policy';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @CheckPolicies<RolePolicy>(RolePolicy.CREATE)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @CheckPolicies<RolePolicy>(RolePolicy.FIND_ALL)
  findAllActive() {
    return this.rolesService.findAllActive();
  }

  @Get(':id')
  @CheckPolicies<RolePolicy>(RolePolicy.FIND_ONE)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies<RolePolicy>(RolePolicy.UPDATE)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @CheckPolicies<RolePolicy>(RolePolicy.DELETE)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
