import { IsEnum, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { TypePermissions } from '../types/type-permissions.type';

export class CreatePermissionDto {
  @IsString()
  @MinLength(2)
  @MaxLength(155)
  name: string;

  @IsUrl({ require_host: false })
  route?: string;

  @IsEnum(TypePermissions)
  type: TypePermissions;
}
