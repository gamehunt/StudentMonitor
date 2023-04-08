import express from "express";
import { LESSON_PROVIDER } from "../providers/config";

export const LESSONS_ROUTER = express.Router()

LESSONS_ROUTER.route('/')
.get(async (req, res) => {
    res.send({ok: true, data: await LESSON_PROVIDER.getLessons()})
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