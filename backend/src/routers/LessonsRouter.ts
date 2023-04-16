import express from "express";
import { WeekLessons } from "shared";
import { GROUP_PROVIDER, LESSON_PROVIDER, USER_PROVIDER } from "../providers/config";
import { sparseArray, toBoolean } from "../utils";
import { USERS_ROUTER } from "./UsersRouter";

export const LESSONS_ROUTER = express.Router()

LESSONS_ROUTER.route('/')
.get(async (req, res) => {
    if(req.query['is_even']){
        if(!req.query['group']){
            res.sendStatus(400)
            return
        }
        let groupId = parseInt(req.query['group'] as string)

        if(isNaN(groupId)){
            res.sendStatus(400)
            return
        }

        let group   = await GROUP_PROVIDER.getGroupById(groupId)
        let isEven  = toBoolean(req.query['is_even'] as string)
        if(!req.query['day']) {
            let lessons = await LESSON_PROVIDER.getLessonsForWeek(group, isEven)
            res.send({ok: true, data: sparseArray(lessons)})
        }else {
            let day     = parseInt(req.query['day'] as string)
            res.send({ok: true, data: await LESSON_PROVIDER.getLessonsForDay(day, isEven, group)})
        }
    }else{
        res.send({ok: true, data: await LESSON_PROVIDER.getLessons()})
    }
})
.post(async (req, res) => {
    if(!req.body['name']){
        res.sendStatus(400)
        return
    }
    await LESSON_PROVIDER.createLesson(req.body['name'])
    res.send({ok: true})
})

LESSONS_ROUTER.route('/:id')
.delete(async (req, res) => {
    await LESSON_PROVIDER.deleteLesson(parseInt(req.params['id']))
    res.send({ok: true})
})
.patch(async (req, res) => {
    if(!req.body['name']){
        res.sendStatus(400)
        return
    }
    await LESSON_PROVIDER.editLesson(parseInt(req.params['id']), req.body['name'])
    res.send({ok: true})
})

LESSONS_ROUTER.route('/schedule')
.post(async (req, res) => {
    if(!req.body['lesson'] || !req.body['teacher'] || !req.body['group']) {
        res.sendStatus(400)
        return;
    }

    let lesson  = await LESSON_PROVIDER.getLessonsById(req.body['lesson']['id'])
    let teacher = await USER_PROVIDER.getUserById(req.body['teacher']['id'])
    let group   = await GROUP_PROVIDER.getGroupById(req.body['group']['id'])

    if(!lesson || !teacher || !group) {
        res.sendStatus(400)
        return;
    }

    await LESSON_PROVIDER.createLessonOrder(lesson, teacher, group, req.body['day'], req.body['order'], req.body['is_even'])

    res.send({ok: true})
})

LESSONS_ROUTER.route('/schedule/:id')
.delete(async (req, res) => {
    await LESSON_PROVIDER.deleteLessonOrder(parseInt(req.params['id']))
    res.send({ok: true})
})

.patch(async (req, res) => {
    if(!req.body['lesson'] || !req.body['teacher']) {
        res.sendStatus(400)
        return;
    }

    let lesson  = await LESSON_PROVIDER.getLessonsById(req.body['lesson']['id'])
    let teacher = await USER_PROVIDER.getUserById(req.body['teacher']['id'])

    if(!lesson || !teacher) {
        res.sendStatus(400)
        return;
    }

    await LESSON_PROVIDER.editLessonOrder(parseInt(req.params['id']), lesson, teacher, req.body['day'], req.body['order'])
    res.send({ok: true})
})

LESSONS_ROUTER.route('/schedule/teacher/:id')
    .get(async (req, res) => {
        let teacher = await USER_PROVIDER.getUserById(parseInt(req.params['id']))
        if(!teacher) {
            res.sendStatus(400)
            return;
        }
        let lessons = await LESSON_PROVIDER.getLessonsForTeacher(teacher, toBoolean(req.query['is_even']?.toString() ?? "false"))
        res.send({ok: true, data: sparseArray(lessons)})
    })