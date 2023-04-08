import { AppDataSource } from "../../data-source"
import { Role } from "../../entity/Role"


export class RoleProvider {
    public async getRoles() : Promise<Role[]> {
        return AppDataSource.getRepository(Role).find()
    }

    public async addRole(name: string, permissions: number) {
        let r: Role = new Role()
        r.name = name
        r.permissions = permissions
        await AppDataSource.getRepository(Role).save(r)
    }

    public async deleteRole(id: number) {
        let r = await AppDataSource.getRepository(Role).findOneBy({id: id})
        if(!r){
            return;
        }
        await AppDataSource.getRepository(Role).delete(r)
    }

    public async editRole(id: number, name: string, permissions: number){
        let r = await AppDataSource.getRepository(Role).findOneBy({id: id})
        if(!r){
            return;
        }
        r.name = name
        r.permissions = permissions
        await AppDataSource.getRepository(Role).save(r)
    }
}

