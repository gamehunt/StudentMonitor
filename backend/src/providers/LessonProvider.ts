import { AppDataSource } from "../data-source"
import { LessonOrder } from "../entity/LessonOrder"
import { User } from "../entity/User"

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

}

export const LESSON_PROVIDER: LessonProvider = new LessonProvider()