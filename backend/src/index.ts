import { AppDataSource } from "./data-source";

import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Session } from "./entity/Session";
import { TypeormStore } from "connect-typeorm/out";
import bodyParser from "body-parser";
import { User } from "./entity/User";
import bcrypt from 'bcrypt';
import { Role } from "./entity/Role";

import { ADMIN, isStudent } from 'shared'
import cookieParser from "cookie-parser";
import { USERS_ROUTER } from "./routers/UsersRouter";
import { ROLES_ROUTER } from "./routers/RolesRouter";
import { GROUPS_ROUTER } from "./routers/GroupsRouter";
import { USER_PROVIDER, LESSON_PROVIDER } from "./providers/config";
import { LESSONS_ROUTER } from "./routers/LessonsRouter";

dotenv.config();

const app = express();
const root_router = express.Router();
const port = process.env.PORT;

AppDataSource.initialize().then(async () => {

    let root_role: Role | null = await AppDataSource.getRepository(Role).findOneBy({id: 1})
    if(!root_role){
        root_role.id = 1
        root_role = new Role()
        root_role.name = 'Администратор'
        root_role.permissions = ADMIN
        await AppDataSource.getRepository(Role).save(root_role)
    }

    let root: User | null = await AppDataSource.getRepository(User).findOneBy({id: 1})
    if(!root){
        root = new User()
        root.id = 1
        root.username = process.env.ROOT_USER
        root.password = await bcrypt.hash(process.env.ROOT_PASSWORD, 4)
        root.fio  = 'Root'
        root.role = root_role
        await AppDataSource.getRepository(User).save(root)
    }

    app.use(bodyParser.json({}))

    passport.use(
        new LocalStrategy(
            async function verify(username, password, cb) {
                try {
                    let user = await USER_PROVIDER.Login(username, password)
                    return cb(null, user ? user : false);
                } catch (err) {
                    return cb(err);
                }
            }
        )
    );

    passport.serializeUser(function (user: any, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (user, cb) {
        USER_PROVIDER.getUserById(user as number).then((u: User) => {
            cb(null, u);
        })
    });

    const sessionRepository = AppDataSource.getRepository(Session);

    app.use(cookieParser("rawr"));
    app.use(
        session({
            secret: "rawr",
            resave: false,
            saveUninitialized: false,
            store: new TypeormStore({
                cleanupLimit: 2,
                ttl: 86400,
            }).connect(sessionRepository),
            cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: process.env.PROD ? true : false},
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/api", root_router);

    root_router.post("/login", (req, res, next) => {
        passport.authenticate("local", function (err, user, info, status) {
            if (err) {
                res.status(400).json({ok: false, message: err});
                return;
            }
            if(!user) {
                res.send({ok: false, message: 'Invalid username or password'})
                return;
            }
            return req.login(user, function (error) {
                if (error) return next(error);
                return next();
            });
        })(req, res, next);
    }, (req, res) => {
        let user: User = req.user as User
        res.send({ok: true, data: {fio: user.fio, role: user.role, group: user.group}})
    });

    root_router.post("/logout", async (req, res) => {
        req.logout(function () {
            res.send({ok: true});
        });
    });

    root_router.get("/time", async (req, res) => {
        res.send(Date.now().toString());
    });

    root_router.use('/users',   USERS_ROUTER)
    root_router.use('/roles',   ROLES_ROUTER)
    root_router.use('/groups',  GROUPS_ROUTER)
    root_router.use('/lessons', LESSONS_ROUTER)

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
})
.catch((error) => console.log(error));
