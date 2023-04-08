import { AppDataSource } from "../../data-source"
import { Lesson } from "../../entity/Lesson"
import { LessonOrder } from "../../entity/LessonOrder"
import { User } from "../../entity/User"


export class LessonProvider {

    public async getLessonsForDay(day: number, is_even: boolean){
        return await AppDataSource.getRepository(LessonOrder).find({
            where: {day: day, is_even: is_even}, 
            relations: {
                teacher: true,
                group: true,
                lesson: true,
                entries: true
            }
        })
    }

    public async getLessonsForWeek(user: User, is_even: boolean){
        let week_lessons = await AppDataSource.getRepository(LessonOrder).find(
            {
                where: {is_even: is_even},
                relations: {
                    teacher: true,
                    group: true,
                    lesson: true,
                    entries: true
                }
            }
        )
        return week_lessons.filter(l => l.teacher.id == user.id || l.group.students.find(e => e.id == user.id) != undefined)
        .sort((a, b) => b.day - a.day)
        .sort((a, b) => b.order - a.order)
    }

    public async getLessons() : Promise<Lesson[]> {
        return AppDataSource.getRepository(Lesson).find()
    }

    public async deleteLesson(id: number) {
        await AppDataSource.getRepository(Lesson).delete({id: id})
    }

    public async createLesson(name: string) {
        let lesson: Lesson = new Lesson()
        lesson.name = name
        await AppDataSource.getRepository(Lesson).save(lesson)
    }

    public async editLesson(id: number, name: string) {
        let lesson: Lesson = await AppDataSource.getRepository(Lesson).findOneBy({id: id})
        lesson.name = name
        await AppDataSource.getRepository(Lesson).save(lesson)
    }
}

