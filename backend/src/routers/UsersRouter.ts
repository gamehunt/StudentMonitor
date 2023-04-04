import express from "express";
import { checkPermissions, ACCOUNT_MANAGMENT } from "shared";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { USER_PROVIDER } from "../providers/UserProvider";

export const USERS_ROUTER = express.Router()

USERS_ROUTER.use((req, res, next) => {
    let user: User = req.user as User
    if(!user || !checkPermissions(user.role.permissions, ACCOUNT_MANAGMENT)){
        res.sendStatus(403)
        return
    }
    next()
})

USERS_ROUTER.get('/', async (req, res) => {
        res.send({ok: true, data: await USER_PROVIDER.getUsers()});
    })

USERS_ROUTER.route('/:username')
    .delete(async (req, res) => {
        let result = await USER_PROVIDER.deleteUserByUsername(req.params['username'])
        if(!result){
            res.status(400).send({ok: false});
        } else {
            res.send({ok: true})
        }
    })
    .post(async (req, res) => {
        if(!req.body['username'] || !req.body['password'] || !req.body['fio'] || !req.body['role']){
            res.status(400).send({ok: false})
            return
        }
        await USER_PROVIDER.addUser(req.body['username'], req.body['password'], req.body['fio'], req.body['role'])
        res.send({ok: true});
    })
    .patch(async (req, res) => {
        if(!req.body['username'] || !req.body['password'] || !req.body['fio'] || !req.body['role']){
            res.status(400).send({ok: false})
            return
        }
        let result = await USER_PROVIDER.editUser(req.params['username'], req.body['username'], req.body['password'], req.body['fio'], req.body['role'])
        if(!result){
            res.status(400).send({ok: false});
        } else {
            res.send({ok: true})
        }
    })