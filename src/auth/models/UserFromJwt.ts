import { User } from "src/users/entities/user.entity";

export interface UserFromJwt {
   age: number;
   username: string;
   fullName: string;
}