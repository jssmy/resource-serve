import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFactory } from './factories/user.factory';
import { ConfirmAccountService } from 'src/confirm-account/confirm-account.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    findAll() {
        return this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .select([
            'user.id',
            'user.state',
            'user.email',
            'user.name',
            'user.surnames',
            'user.avatars',
            'role.id',
            'role.name',
        ])
        .getMany();
        
    }

    create(createUserDto: CreateUserDto) {
        const user = {
            ...createUserDto,
            password: 'AF4244'
        };

        return this.userRepository.save(new UserFactory(user).create());
    }
    

}
