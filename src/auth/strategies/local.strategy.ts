import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { AuthService } from "../auth.service";

@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        console.log('localStrategy constructor')
        super({usernameField: 'username'})
    }

    validate(username: string, password: string){
        console.log('localStrategy validate')
        return this.authService.validateUser(username, password);
    }
}