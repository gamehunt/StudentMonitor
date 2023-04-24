import { AppDataSource } from "../../data-source"
import { Group } from "../../entity/Group"
import { Lesson } from "../../entity/Lesson"
import { LessonOrder } from "../../entity/LessonOrder"
import { User } from "../../entity/User"
import { removePassword } from "../../utils"


export class LessonProvider {

    public async getLessonsForDay(day: number, is_even: boolean, group: Group){
        return await AppDataSource.getRepository(LessonOrder).find({
            where: {day: day, is_even: is_even, group: group}, 
            relations: {
                teacher: true,
                group: true,
                lesson: true,
                entries: true
            }
        })
    }

    public async getLessonsForWeek(group: Group, is_even: boolean){
        let week_lessons = await AppDataSource.getRepository(LessonOrder).find(
            {
                where: {is_even: is_even, group: group},
                relations: {
                    teacher: true,
                    group: true,
                    lesson: true,
                    entries: true
                }
            }
        )
        return week_lessons
    }

    public async getLessons() : Promise<Lesson[]> {
        return AppDataSource.getRepository(Lesson).find()
    }

    public async getLessonsById(id: number) : Promise<Lesson> {
        return AppDataSource.getRepository(Lesson).findOneBy({id: id})
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

    public async createLessonOrder(lesson: Lesson, teacher: User, group: Group, day: number, order: number, is_even: boolean) {
        let lessonOrder: LessonOrder = new LessonOrder()
        lessonOrder.lesson = lesson;
        lessonOrder.teacher = teacher;
        lessonOrder.day = day;
        lessonOrder.order = order;
        lessonOrder.group = group;
        lessonOrder.is_even = is_even;
        await AppDataSource.getRepository(LessonOrder).save(lessonOrder)
    }

    public async editLessonOrder(id: number, lesson: Lesson, teacher: User, day: number, order: number) {
        let lessonOrder: LessonOrder = await AppDataSource.getRepository(LessonOrder).findOneBy({id: id})
        if(!lessonOrder){
            return;
        }
        lessonOrder.lesson = lesson;
        lessonOrder.teacher = teacher;
        lessonOrder.day = day;
        lessonOrder.order = order;
        await AppDataSource.getRepository(LessonOrder).save(lessonOrder)
    }

    public async getLessonOrderById(id: number): Promise<LessonOrder> {
        return AppDataSource.getRepository(LessonOrder).findOneBy({id: id})
    }

    public async deleteLessonOrder(id: number) {
        await AppDataSource.getRepository(LessonOrder).delete({id: id})
    }

    public async getLessonsForTeacher(teacher: User, is_even: boolean) {
        return await (await AppDataSource.getRepository(LessonOrder).find({
            where: { is_even: is_even, teacher: teacher },
            relations: {
                teacher: true,
                group: true,
                lesson: true,
                entries: true
            }
        })).map(e => {
            e.teacher = removePassword(e.teacher)
            return e;
        })
    }
}

