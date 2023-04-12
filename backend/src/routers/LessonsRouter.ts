import express from "express";
import { WeekLessons } from "shared";
import { GROUP_PROVIDER, LESSON_PROVIDER, USER_PROVIDER } from "../providers/config";
import { toBoolean } from "../utils";

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
            let result: WeekLessons = []
            for(let i = 0; i <= 5; i++) {
                result.push(lessons.filter(e => e.day == i))
                if(result[i].length > 0) {
                    // Fills order gaps with nulls, so we have empty lessons. For example [1, 3, 5] => [1, null, 3, null, 5]
                    result[i] = Array.from(Array(Math.max(...result[i].map(e => e.order)) + 1).keys()).map(idx => result[i].find(e => e.order == idx) || null)
                }
            }
            res.send({ok: true, data: result})
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