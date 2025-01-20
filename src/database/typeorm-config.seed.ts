import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { ConfigModule, ConfigService } from '@nestjs/config';
import InitSeeder from './seeds/init.seeder';
import { databaseConfiguration } from '../config/database/db-auth.config';
import { Logger } from '@nestjs/common';


(async () => {
  const log = new Logger();

  log.log('********************************************');
  log.log('*           Seed initialized               *');

  log.warn('********************************************');
  log.warn('    PLEASE NOT USE THIS ON PRODUCCTION     *');


  ConfigModule.forRoot({
    envFilePath: '.env',
  });


  const config = new ConfigService();
  
  const dataSource = new DataSource({
    ...databaseConfiguration(config),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    seeds: [InitSeeder],
  } as DataSourceOptions & SeederOptions);

  await dataSource.initialize();

  log.log('********************************************');
  log.log('*      Connection Database stablish        *');

  await runSeeders(dataSource);

  log.log('********************************************');
  log.log('*         Seed completed                   *');
  log.log('********************************************');
})().finally();
