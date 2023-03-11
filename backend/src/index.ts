import { AppDataSource } from "./data-source"

import dotenv  from 'dotenv'
import express from 'express'

dotenv.config()

const app         = express()
const root_router = express.Router()
const port        = process.env.PORT

AppDataSource.initialize().then(async () => {
    app.use('/api', root_router)

    root_router.get('/login', async (req, res) => {
        res.send('TEST')
    })

    root_router.get('/logout', async (req, res) => {
        res.send('TEST')
    })

    root_router.get('/lessons', async (req, res) => {
        res.send([
            [
                {name: "Математический анализ"},
                null,
                {name: "Дискретная математика"},
                {name: "Дискретная математика"},
                {name: "Дискретная математика"},
                {name: "Дискретная математика"},
            ],
            [],
            [],
            [
                {name: "Анлийский язык"}
            ]
        ])
    })

    root_router.get('/students', async (req, res) => {
        res.send('TEST')
    })
      
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}).catch(error => console.log(error))
