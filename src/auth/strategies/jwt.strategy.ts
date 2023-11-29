import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserPayload } from "../models/UserPayload";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from "../models/UserFromJwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'COntoDoManolo'
        });
    }

    async validate(payload: UserPayload): Promise<UserFromJwt> {
        return {
            age: payload.sub,
            username: payload.username,
            fullName: payload.name
        }
    }

}