import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorator/is-public.decorator';

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest){
        console.log("AuthController POST /login")
        return this.authService.login(req.user);
    }
    
    @Get('teste')
    teste(@Request() req){
        console.log("AuthController GET /teste")
        return "teste jwt"
    }
}
