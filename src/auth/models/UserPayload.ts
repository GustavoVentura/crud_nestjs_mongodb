import { User } from "src/users/entities/user.entity";

export interface UserPayload {
    sub: number;
    username: string;
    name: string;
    iat?: number;
    exp?: number;
}