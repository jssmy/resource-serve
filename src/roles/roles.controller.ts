import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CheckPolicies } from 'src/commons/guards/check-policies';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @CheckPolicies(TypePermissions.API)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }


  @Get()
  @CheckPolicies(TypePermissions.API)
  findAll(
    @Query('limit', new ParseIntPipe( { optional: true })) limit: number,
    @Query('page',  new ParseIntPipe( { optional: true })) page: number) {

    limit = limit || 10;
    page = page ||  1;

    return this.rolesService.findAll(limit, page);
  }

  @Get(':id')
  @CheckPolicies(TypePermissions.API)
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @CheckPolicies(TypePermissions.API)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @CheckPolicies(TypePermissions.API)
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.rolesService.remove(id);
  }
}
