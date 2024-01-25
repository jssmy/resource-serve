import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import UserSeeder from './user.seeder';
import RoleSeeder from './role.seeder';
import PermissionSeeder from './permission.seeder';
import AsignPermissionsToRolesSeeder from './asign-permissions-to-roles.seeder';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [
        RoleSeeder,
        UserSeeder,
        PermissionSeeder,
        AsignPermissionsToRolesSeeder,
      ],
    });
  }
}
