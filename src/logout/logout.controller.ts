import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LogoutService } from './logout.service';
import { CreateLogoutDto } from './dto/create-logout.dto';
import { UpdateLogoutDto } from './dto/update-logout.dto';

@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post()
  create(@Body() createLogoutDto: CreateLogoutDto) {
    return this.logoutService.create(createLogoutDto);
  }

  @Get()
  findAll() {
    return this.logoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogoutDto: UpdateLogoutDto) {
    return this.logoutService.update(+id, updateLogoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logoutService.remove(+id);
  }
}
