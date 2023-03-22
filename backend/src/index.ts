import { AppDataSource } from "./data-source"

import dotenv   from 'dotenv'
import express  from 'express'
import session  from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { LessonProvider, LESSON_PROVIDER } from "./providers/LessonProvider"
import { USER_PROVIDER } from "./providers/UserProvider"
import { Session } from "./entity/Session"
import { TypeormStore } from "connect-typeorm/out"

dotenv.config()

const app         = express()
const root_router = express.Router()
const port        = process.env.PORT

AppDataSource.initialize().then(async () => {
    passport.use(new LocalStrategy(
        function verify(username, password, cb) {
            try{
                USER_PROVIDER.Login(username, password).then(user => {
                    return cb(null, user ? user : false)
                })
            }catch(err){
                return cb(err)
            }
        }
    ));

    passport.serializeUser(function(user: any, cb) {
        process.nextTick(function() {
            cb(null, user.id);
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, USER_PROVIDER.getUserById(user as number));
        });
    });

    const sessionRepository = AppDataSource.getRepository(Session);

    app.use(session({
        secret: 'rawr',
        resave: false,
        saveUninitialized: false,
        store: new TypeormStore({
            cleanupLimit: 2,
            ttl: 86400
        }).connect(sessionRepository),
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: true }
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', root_router)

    root_router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
    }))

    root_router.get('/logout', async (req, res) => {
        req.logout(function() {
            res.redirect('/');
        });
    })

    root_router.get('/time', async (req, res) => {
        res.send(Date.now().toString())
    })


    root_router.get('/lessons', async (req, res) => {
        let lessons = await LESSON_PROVIDER.getLessonsForWeek(undefined, Boolean(req.query.is_even)); 
        res.send(lessons)
    })

    root_router.get('/students', async (req, res) => {
        res.send('TEST')
    })
    
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}).catch(error => console.log(error))

