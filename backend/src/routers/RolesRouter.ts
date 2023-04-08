import express from "express";
import { checkPermissions, ROLE_MANAGMENT } from "shared";
import { User } from "../entity/User";
import { ROLE_PROVIDER } from "../providers/config";

export const ROLES_ROUTER = express.Router()

ROLES_ROUTER.use((req, res, next) => {
    let user: User = req.user as User
    if(!user || !checkPermissions(user.role.permissions, ROLE_MANAGMENT)){
        res.sendStatus(403)
        return
    }
    next()
})

ROLES_ROUTER
.route('/')
.get(async (req, res) => {
    res.send({ok: true, data: await ROLE_PROVIDER.getRoles()})
})
.post(async (req, res) => {
    if(!req.body['name'] || !req.body['permissions']) {
        res.status(400).send({ok: false})
        return
    }
    await ROLE_PROVIDER.addRole(req.body['name'], parseInt(req.body['permissions']))
    res.send({ok: true})
})
.patch(async (req, res) => {
    if(!req.body['id']|| !req.body['name'] || !req.body['permissions']) {
        res.status(400).send({ok: false})
        return
    }
    await ROLE_PROVIDER.editRole(parseInt(req.body['id']), req.body['name'], parseInt(req.body['permissions']))
    res.send({ok: true})
})

ROLES_ROUTER.delete('/:id', async (req, res) => {
    await ROLE_PROVIDER.deleteRole(parseInt(req.params.id))
    res.send({ok: true})
})