import { Between } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Group } from "../../entity/Group";
import { JournalEntry } from "../../entity/JournalEntry";
import { LessonOrder } from "../../entity/LessonOrder";
import { User } from "../../entity/User";
import { removePassword } from "../../utils";
import { Lesson } from "../../entity/Lesson";


export class JournalProvider {
    async updateMarks(day: Date, lesson: LessonOrder, student: User, was: boolean) {
        let entry = await AppDataSource.getRepository(JournalEntry).findOne({where: {date: day, lesson: lesson, student: student}, 
            relations: {lesson: true, student: true}})
        if(!entry) {
            entry = new JournalEntry()
            entry.lesson  = lesson
            entry.student = student
            entry.date = day
        }
        entry.was = was
        await AppDataSource.getRepository(JournalEntry).save(entry)
    }

    async getMarksForGroup(day: Date, group: Group) {
        return (await AppDataSource.getRepository(JournalEntry).find({where: {date: day}, relations: ['lesson', 'student', 'student.group']}))
        .filter(e => e.student.group.id == group.id)
        .map(
            e => {
                e.student = removePassword(e.student)
                return e;
            }
        )
    }

    async getMarksForStudent(monday: Date, user: User): Promise<JournalEntry[]> {
        let weekEnd = new Date(monday)
        weekEnd.setDate(weekEnd.getDate() + 7)
        return (await AppDataSource.getRepository(JournalEntry)
            .find({ where: { date: Between(monday, weekEnd), student: user }, relations: ['lesson', 'student'] }))        
            .map(
                e => {
                    e.student = removePassword(e.student)
                    return e;
                }
            )
    }

    async getAllMarks(start: Date, end: Date, group: Group, lesson: Lesson): Promise<JournalEntry[]> {
        let data = (await AppDataSource.getRepository(JournalEntry)
            .find({ where: { date: Between(start, end) }, relations: ['lesson', 'lesson.lesson', 'student', 'student.group'] }))
            .filter(e => e.student.group.id == group.id && e.lesson.lesson.id == lesson.id)
            .map(
                e => {
                    e.student = removePassword(e.student)
                    return e;
                }
            )
        return data
    }
}