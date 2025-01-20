import { IsArray, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(155)
  name: string;


  @IsArray()
  @IsUUID('4', { each: true })
  permissions: string [];

}
