import { Logger } from '@nestjs/common';
import { Helper } from 'src/commons/classes/helper';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { UserFactory } from 'src/user/factories/user.factory';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    const repositoryRole = dataSource.getRepository(Role);

    const log = new Logger();

    const userRoot = await repository.findOneBy({ email: 'root@mail.com' });

    if (userRoot) {
      log.warn('********************************************');
      log.warn('*      User Root already exist');
      log.warn(`*      NAME: ${userRoot.name + ' ' + userRoot.surnames}`);
      log.warn(`*      MAIL: ${userRoot.email}`);
      log.warn(`*      ROOT PASSWORD: xxxxxxxxxx`);
      log.warn(`*-----------------------------------------`);
      log.warn('*     If dont remember user root password');
      log.warn('*     please contact your admin system');
      return;
    }

    const password = Helper.uuid().substring(0, 15);

    const user = new UserFactory({
      name: 'Root',
      surnames: 'Application',
      email: 'root@mail.com',
      password,
      roleId: 1,
    }).create();

    log.log('********************************************');
    log.log(`*      NAME: ${user.name + user.surnames}  `);
    log.log(`*      MAIL: ${user.email}                 `);
    log.log(`*      ROOT PASSWORD: ${password}          `);
    log.log('********************************************');

    const role = await repositoryRole.findOneBy({ name: 'Root' });
    user.accountValidated = true;
    user.accountValidatedDate = new Date();
    user.role = role;
    await repository.save(user);
  }
}
