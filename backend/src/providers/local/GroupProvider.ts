import { AppDataSource } from "../../data-source";
import { Group } from "../../entity/Group";
import { User } from "../../entity/User";

export class GroupProvider {
    async getGroups() : Promise<Group[]> {
        return AppDataSource.getRepository(Group).find({relations: {students: true}})
    }

    async addGroup(name: string) {
        let gr : Group = new Group()
        gr.name = name;
        await AppDataSource.getRepository(Group).save(gr)
    }

    async deleteGroup(id: number) {
        let gr = await AppDataSource.getRepository(Group).findOne({where: {id: id}})
        if(gr) {
            await AppDataSource.getRepository(Group).delete(gr)
            return true
        }
        return false
    }

    async addStudent(group: number, student: number) {
        let gr = await AppDataSource.getRepository(Group).findOne({where: {id: group}, relations: {students: true}})
        let st = await AppDataSource.getRepository(User).findOne({where: {id: student}, relations: {group: true}})
        if(gr && st) {
            st.group = gr
            await AppDataSource.getRepository(User).save(st)
        }
    }

    async deleteStudent(group_id: number, student_id: number) {
        let st = await AppDataSource.getRepository(User).findOne({where: {id: student_id}, relations: {group: true}})
        if(st) {
            let group : Group = st.group;
            if(group && group.id == group_id) {
                st.group = null;
                await AppDataSource.getRepository(User).save(st)
            }
        }
    }
}

