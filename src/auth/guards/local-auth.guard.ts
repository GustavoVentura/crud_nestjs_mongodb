import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    canActivate(context: ExecutionContext) {
        console.log('LocalAuthGuard constructor')
        return super.canActivate(context);   
    }

    handleRequest(err, user) {
        console.log('LocalAuthGuard handleRequest')
        if (err || !user){
            throw new UnauthorizedException(err?.message);
        }
        return user;
    }
}