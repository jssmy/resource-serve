import { Permission } from 'src/permissions/entities/permission.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { permissionesFactories } from '../factories/permission.factory';

export default class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Permission);

    await repository
      .createQueryBuilder()
      .insert()
      .values(permissionesFactories)
      .orIgnore()
      .execute();
  }
}
