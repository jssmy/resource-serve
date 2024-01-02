import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RevokeTokenService } from './revoke-token.service';
import { CreateRevokeTokenDto } from './dto/create-revoke-token.dto';
import { UpdateRevokeTokenDto } from './dto/update-revoke-token.dto';

@Controller('revoke-token')
export class RevokeTokenController {
  constructor(private readonly revokeTokenService: RevokeTokenService) {}

  @Post()
  create(@Body() createRevokeTokenDto: CreateRevokeTokenDto) {
    return this.revokeTokenService.create(createRevokeTokenDto);
  }

  @Get()
  findAll() {
    return this.revokeTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revokeTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevokeTokenDto: UpdateRevokeTokenDto) {
    return this.revokeTokenService.update(+id, updateRevokeTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revokeTokenService.remove(+id);
  }
}
