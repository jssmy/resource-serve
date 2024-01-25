import { Logger } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const log = new Logger();

    const repository = dataSource.getRepository(Role);

    const roleRoot = await repository.findOneBy({ name: 'Root' });

    if (roleRoot) {
      log.warn('********************************************');
      log.warn('*   Root role already exist');
      return;
    }
    const role = new Role();
    role.name = 'Root';

    await repository.save(role);
  }
}
