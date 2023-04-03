import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

import bcrypt from 'bcrypt';

export class UserProvider {

    public async getUserById(id: number) : Promise<User>{
        return AppDataSource.getRepository(User).findOne({where: {id: id}, relations: {role: true}})
    }

    public async getUsers() : Promise<User[]> {
        return AppDataSource.getRepository(User).find({relations: {role: true}})
    }

    public async Login(username: string, password: string): Promise<User>{
        let user = await AppDataSource.getRepository(User).findOne({where: {username: username}, relations: {role: true}})
        if(!user){
            return undefined;
        }
        if(await bcrypt.compare(password, user.password)){
            return user;
        }else{
            return undefined;
        }
    }
}

export const USER_PROVIDER: UserProvider = new UserProvider()