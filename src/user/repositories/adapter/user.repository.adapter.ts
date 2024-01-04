import { User } from '../../entities/user.entity';

export interface UserRepositoryAdapter {
  create(user: User);
  remove(id: string);
}
