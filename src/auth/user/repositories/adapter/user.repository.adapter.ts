import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";

export interface UserRepositoryAdapter {
  create(user: User);
  remove(id: string);
}