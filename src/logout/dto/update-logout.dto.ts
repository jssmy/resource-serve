import { PartialType } from '@nestjs/mapped-types';
import { CreateLogoutDto } from './create-logout.dto';

export class UpdateLogoutDto extends PartialType(CreateLogoutDto) {}
