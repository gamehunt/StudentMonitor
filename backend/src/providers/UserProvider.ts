import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

const bcrypt = require('bcrypt');

export class UserProvider {

    public async getUserById(id: number){
        return await AppDataSource.getRepository(User).findOneBy({id: id})
    }

    public async Login(username: string, password: string): Promise<User>{
        let user = await AppDataSource.getRepository(User).findOneBy({username: username})
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