import express from "express";
import { checkPermissions, GROUP_MANAGMENT } from "shared";
import { User } from "../entity/User";
import { GROUP_PROVIDER } from "../providers/config";

export const GROUPS_ROUTER = express.Router()

GROUPS_ROUTER.use((req, res, next) => {
    let user: User = req.user as User
    if(!user || (req.method != 'GET' && !checkPermissions(user.role.permissions, GROUP_MANAGMENT))){
        res.sendStatus(403)
        return
    }
    next()
})

GROUPS_ROUTER.route('/')
    .get(async (req, res) => {
        res.send({ok: true, data: await GROUP_PROVIDER.getGroups()})
    })
    .post(async (req, res) => {
        if(!req.body.name) {
            res.sendStatus(400)
            return;
        }
        await GROUP_PROVIDER.addGroup(req.body.name)
        res.send({ok: true})
    })

GROUPS_ROUTER.route('/:id')
    .delete(async (req, res) => {
        let result = await GROUP_PROVIDER.deleteGroup(parseInt(req.params['id']))
        if(!result){
            res.status(400).send({ok: false});
        } else {
            res.send({ok: true})
        }
    })

GROUPS_ROUTER.route('/:id/students')
    .get(async (req, res) => {
        res.send({ok: true, data: await GROUP_PROVIDER.getStudents(parseInt(req.params['id']))})
    })
    .post(async (req, res) => {
        if(!req.body.id) {
            res.sendStatus(400)
            return;
        }
        await GROUP_PROVIDER.addStudent(parseInt(req.params['id']), req.body.id)
        res.send({ok: true})
})

GROUPS_ROUTER.route('/:group/students/:student')
    .delete(async (req, res) => {
        await GROUP_PROVIDER.deleteStudent(parseInt(req.params['group']), parseInt(req.params['student']))
        res.send({ok: true})
    })