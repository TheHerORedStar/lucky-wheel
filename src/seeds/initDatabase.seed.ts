import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../entities';
import { createEntity } from '../utils/typeorm';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await factory(User)().create();
    // user
    // await createEntity(User, {
    //   email: 'Technical Lead',
    // });
    // await createEntity(Version, {
    //   version: '1.0.0',
    //   commitId: '',
    //   deleteFlag: false,
    // });
  }
}
