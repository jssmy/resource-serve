import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateTokenDto {
    @MaxLength(40)
    @MinLength(5)
    @IsEmail()
    email: string;

    @MaxLength(15)
    @MinLength(8)
    password: string;
    
}
