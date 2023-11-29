import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModule: Model<UserDocument>){}

    async create(payload: CreateUserDto){
        const user = {
            ...payload,
            password: await bcrypt.hash(payload.password, 10),

        }
        const createdUser = await this.userModule.create(user);

        createdUser.password = undefined
        
        
        // return {
        //     ...createdUser,
        //     password: undefined,
        // };
        return createdUser;
    }

    async findAll(){
        return await this.userModule.find();
    }

    async findUser(username: string){
        return await this.userModule.findOne({"username": username}).exec();
    }
    
}
