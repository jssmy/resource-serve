import { IsEnum, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { TypePermissions } from '../types/type-permissions.type';
import { HttpMethod } from 'src/commons/enums/http- methods';

export class CreatePermissionDto {
  @IsString()
  @MinLength(2)
  @MaxLength(155)
  name: string;

  @IsUrl({ require_host: false })
  route?: string;

  @IsEnum(TypePermissions)
  type: TypePermissions;


  @IsEnum(HttpMethod)
  @IsOptional()
  method?: HttpMethod;


  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsNumber()
  @IsOptional()
  order?: number;
}
