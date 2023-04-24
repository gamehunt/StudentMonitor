import express from "express";
import { checkPermissions, getMonday, TEACHER, timestampToDate } from "shared";
import { User } from "../entity/User";
import { GROUP_PROVIDER, JOURNAL_PROVIDER, LESSON_PROVIDER, USER_PROVIDER } from "../providers/config";
import { LessonOrder } from "../entity/LessonOrder";
import { toBoolean } from "../utils";

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