import { ByCript } from 'src/commons/classes/bycript';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';

type UserConfig = Omit<RegisterUserDto, 'confirmPassword'>;

export class UserFactory {
  constructor(private readonly user: Partial<UserConfig>) {}

  create(): User {
    const hashPassword = ByCript.hasSync(this.user.password);
    return {
      ...this.user,
      email: this.user.email?.toLocaleLowerCase(),
      avatars: this.avatars,
      password: hashPassword,
    } as User;
  }

  private get avatars() {
    return this.user.avatars && this.user.avatars.length
      ? this.user.avatars
      : [
          'https://img.freepik.com/vector-premium/imagen-perfil-avatar-hombre-ilustracion-vectorial_268834-541.jpg',
        ];
  }
}
