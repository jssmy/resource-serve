import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CheckPolicies } from 'src/commons/guards/check-policies';
import { TypePermissions } from './types/type-permissions.type';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @CheckPolicies(TypePermissions.API)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get('parent/:id?')
  @CheckPolicies(TypePermissions.API)
  findAllByParentId(
    @Param('id', new ParseUUIDPipe({ version: '4', optional: true }))
    id: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ) {
    limit = limit || 10;
    page = page || 1;
    return this.permissionsService.findAllByParentId(id, limit, page);
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

  @Put(':id')
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
