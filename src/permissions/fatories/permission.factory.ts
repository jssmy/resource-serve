import { Permission } from '../entities/permission.entity';
import { Helper } from 'src/commons/classes/helper';
import { CreatePermissionDto } from '../dto/create-permission.dto';
export class PermissionFactory {
  constructor(private readonly permission: CreatePermissionDto) {}

  create(): Permission {
    return {
      id: Helper.uuid(),
      ...this.permission,
    } as Permission;
  }
}
