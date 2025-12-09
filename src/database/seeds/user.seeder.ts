import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Helper } from '@commons/classes/helper';
import { Role } from '@roles/entities/role.entity';
import { User } from '@user/entities/user.entity';
import { UserFactory } from '@user/factories/user.factory';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    const repositoryRole = dataSource.getRepository(Role);

    const log = new Logger();
    const config = new ConfigService();

    const rootEmail = config.get('APP_USER_ROOT', 'root@mail.com');
    const userRoot = await repository.findOneBy({ email: rootEmail });

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
      email: rootEmail,
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
