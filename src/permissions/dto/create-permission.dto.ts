import { IsEnum, IsNumber, IsOptional, IsString, IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';
import { TypePermissions } from '../types/type-permissions.type';
import { HttpMethod } from 'src/commons/enums/http- methods';

export class CreatePermissionDto {
  @IsString()
  @MinLength(2)
  @MaxLength(155)
  name: string;

  @IsUrl({ require_host: false })
  @IsOptional()
  route?: string;

  @IsEnum(TypePermissions)
  type: TypePermissions;


  @IsEnum(HttpMethod)
  @IsOptional()
  method?: HttpMethod;


  @IsUUID()
  @IsOptional()
  parentId?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
