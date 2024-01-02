import { ByCript } from "src/commons/classes/bycript";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

type UserConfig = Omit<CreateUserDto, 'confirmPassword'>

export class UserFactory {

    constructor(
        private readonly user: UserConfig
        ) {}

    create(): User  {      
        const hashPassword = ByCript.hasSync(this.user.password);
        return {
            ...this.user,
            email: this.user.email.toLocaleLowerCase(),
            avatars: this.avatars,
            password: hashPassword
        }
    }

    private get avatars() {
        return this.user.avatars && this.user.avatars.length ?
        this.user.avatars :
        ['https://img.freepik.com/vector-premium/imagen-perfil-avatar-hombre-ilustracion-vectorial_268834-541.jpg'];            
    }
}