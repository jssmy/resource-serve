import { Permission } from 'src/permissions/entities/permission.entity';
import { DataSource, In } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { permissionesFactories } from '../factories/permission.factory';
import { Role } from 'src/roles/entities/role.entity';

export default class AsignPermissionsToRolesSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {

    const PERMISSIONS_FACTORIES = [
      ...permissionesFactories,
    ]

    const repositoryRole = dataSource.getRepository(Role);
    const repositoryPermission = dataSource.getRepository(Permission);

    const rootRole = await repositoryRole.findOneBy({ name: 'Root' });

    const permissions = await repositoryPermission.find({
      where: { name: In([PERMISSIONS_FACTORIES.map((pr) => pr.name)]) },
    });

    // first clean relationship fot not duplicate
    
    rootRole.permissions = [];

    const toClean = await repositoryRole.preload(rootRole);
    await repositoryRole.save(toClean);

    //// then add permission to root role
    rootRole.permissions = [...permissions];
    const toAdd = await repositoryRole.preload(rootRole);
    await repositoryRole.save(toAdd);
  }
}
