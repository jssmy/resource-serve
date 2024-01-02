import { PartialType } from '@nestjs/mapped-types';
import { CreateRevokeTokenDto } from './create-revoke-token.dto';

export class UpdateRevokeTokenDto extends PartialType(CreateRevokeTokenDto) {}
