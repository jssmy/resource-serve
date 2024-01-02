import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user/entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable( )
export class JwtStrategy extends PassportStrategy( Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly config: ConfigService
    ) {
        super({
            secretOrKey: config.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;

        const user = await this.userRepository.findOneBy( { email});

        if (!user) {
            throw new UnauthorizedException('Token is invalid');
        }

        if (!user.state) {
            throw new UnauthorizedException('User is inactive');
        }

        return user;
    }
}