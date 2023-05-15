import express from "express";
import { checkPermissions, getMonday, JournalEntry, TEACHER, timestampToDate, TotalMarks } from "shared";
import { User } from "../entity/User";
import { GROUP_PROVIDER, JOURNAL_PROVIDER, LESSON_PROVIDER, USER_PROVIDER } from "../providers/config";
import { LessonOrder } from "../entity/LessonOrder";
import { toBoolean } from "../utils";
import { GroupProvider } from "../providers/local/GroupProvider";
import { Group } from "../entity/Group";
import { Lesson } from "../entity/Lesson";

export const JOURNAL_ROUTER = express.Router()

JOURNAL_ROUTER.use((req, res, next) => {
    let user: User = req.user as User
    if(!user || (req.method != 'GET' && !checkPermissions(user.role.permissions, TEACHER))){
        res.sendStatus(403)
        return
    }
    next()
})

JOURNAL_ROUTER.route('/')
    .get(async (req, res) => {
        if(!req.query['student']){
            res.sendStatus(400)
            return;
        }

        if(req.body['day']) {

        } else {

        }
    })
    .patch(async (req, res) => {
        if(!req.body['student'] || !req.body['day'] || !req.body['lesson']) {
            res.sendStatus(400)
            return;
        }
        let student: User       = await USER_PROVIDER.getUserById(parseInt(req.body['student']))
        let lesson: LessonOrder = await LESSON_PROVIDER.getLessonOrderById(parseInt(req.body['lesson']))
        let day                 = timestampToDate(req.body['day'])

        if(!student || !lesson){
            res.sendStatus(400)
            return;
        }

        await JOURNAL_PROVIDER.updateMarks(day, lesson, student, req.body['was'])
        res.send({ok: true})
    })

JOURNAL_ROUTER.get('/groups/:group/:date', async(req, res) => {
    let group = await GROUP_PROVIDER.getGroupById(parseInt(req.params['group']))
    if(!group){
        res.sendStatus(400)
        return;
    }
    let date = new Date(timestampToDate(req.params['date']))
    let data: any[] = await JOURNAL_PROVIDER.getMarksForGroup(date, group)
    res.send({ok: true, data: data.map(e => {
        e.date = e.date.getTime()
        return e
    })})
})

JOURNAL_ROUTER.get('/students/:student/:date', async(req, res) => {
    let user = await USER_PROVIDER.getUserById(parseInt(req.params['student']))
    if(!user){
        res.sendStatus(400)
        return;
    }
    let date = new Date(timestampToDate(req.params['date']))
    let data: any[] = await JOURNAL_PROVIDER.getMarksForStudent(getMonday(date), user)
    res.send({ok: true, data: data.map(e => {
        e.date = e.date.getTime()
        return e
    })})
})

class TotalMarksReqData {
    valid!: boolean
    start?: Date
    end?: Date
    group?: Group
    user?: User | undefined
}

async function parseTotalMarksQuery(req): Promise<TotalMarksReqData> {
    let start: Date = req.query['start'] ? new Date(timestampToDate(req.query['start'] as string)) : undefined
    let end: Date   = req.query['end'] ? new Date(timestampToDate(req.query['end'] as string)) : undefined
    if(!start){
        start = new Date()
        start.setMonth(0)
        start.setDate(1)
    }
    
    if(!end) {
        end = new Date()
        end.setMonth(11)
        end.setDate(31)
    }

    let user = undefined
    if(req.query['user']) {
        user = await USER_PROVIDER.getUserById(parseInt(req.query['user'] as string))
    }
    
    let group = await GROUP_PROVIDER.getGroupById(parseInt(req.params.group))
    if(!group) {
        return {valid: false};
    }

    return {valid: true, start: start, end: end, group: group, user: user}
}

JOURNAL_ROUTER.route('/total/:group/')
    .get(async (req, res) => {
        let reqd: TotalMarksReqData = await parseTotalMarksQuery(req)
        if(!reqd.valid) {
            res.sendStatus(400)
            return
        }

        let data: TotalMarks = new TotalMarks()
        data.marks        = await JOURNAL_PROVIDER.getAllMarks(reqd.start, reqd.end, reqd.group, undefined, reqd.user)
        data.total_missed = data.marks.filter(e => !e.was).length * 2
        res.send({ok: true, data: data})
    })

    JOURNAL_ROUTER.route('/total/:group/:lesson')
    .get(async (req, res) => {
        let reqd = await parseTotalMarksQuery(req)
        if(reqd!) {
            res.sendStatus(400)
            return
        }

        let lesson: Lesson = await LESSON_PROVIDER.getLessonsById(parseInt(req.params.lesson))
        if(!lesson) {
            res.sendStatus(400)
            return
        }

        let data: TotalMarks = new TotalMarks()
        data.marks        = await JOURNAL_PROVIDER.getAllMarks(reqd.start, reqd.end, reqd.group, lesson, reqd.user)
        data.total_missed = data.marks.filter(e => !e.was).length * 2
        res.send({ok: true, data: data})
    })