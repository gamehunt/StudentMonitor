import { AppDataSource } from "../../data-source";
import { Role } from "../../entity/Role";
import { User } from "../../entity/User";
import { USER_PROVIDER } from "../config";

import bcrypt from 'bcrypt'

export class UserProvider {

    public async getUserById(id: number) : Promise<User>{
        return AppDataSource.getRepository(User).findOne({where: {id: id}, relations: {role: true}})
    }

    public async getUserByUsername(username: string) : Promise<User>{
        return AppDataSource.getRepository(User).findOne({where: {username: username}, relations: {role: true}})
    }

    public async deleteUserByUsername(username: string) : Promise<boolean> {
        let user: User = await USER_PROVIDER.getUserByUsername(username)
        if(user && user.id != 1){
            await AppDataSource.getRepository(User).delete(user)
            return true;
        }
        return false;
    }

    public async addUser(username: string, password: string, fio: string, role: number) {
        let user: User = new User()
        user.username = username
        user.password = await bcrypt.hash(password, 4)
        user.fio      = fio
        user.role     = await AppDataSource.getRepository(Role).findOneBy({id: role})
        await AppDataSource.getRepository(User).save(user)
    }

    public async editUser(oldUsername: string, username: string, password: string, fio: string, role: number) : Promise<boolean> {
        let user: User = await this.getUserByUsername(oldUsername)
        if(!user){
            return false
        }
        user.username = username
        user.password = await bcrypt.hash(password, 4)
        user.fio      = fio
        user.role     = await AppDataSource.getRepository(Role).findOneBy({id: role})
        await AppDataSource.getRepository(User).save(user)
        return true
    }

    public async getUsers() : Promise<User[]> {
        return AppDataSource.getRepository(User).find({relations: {role: true, group: true}})
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

