import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt'
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService,
    ){}

    login(user: User): UserToken {
        // Transforma o user em um JWT
        const payload: UserPayload = {

            sub: user.age,
            username: user.username,
            name: user.fullName,
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken
        }
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findUser(username);

        if (user){
            //checar se a senha informada correponde a hash que está no banco
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if ( isPasswordValid){
                user.password = undefined
                return user
            }
        }
        //Se chegar aqui, significa que não encontrou o user e/ou a senha não corresponde
        //throw new UnauthorizedException('Email address or password is incorret.')
        throw new Error('Email address or password is incorret.')
    }
}
