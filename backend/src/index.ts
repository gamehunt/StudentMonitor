import { AppDataSource } from "./data-source"

import dotenv  from 'dotenv'
import express from 'express'

dotenv.config()

const app         = express()
const root_router = express.Router()
const port        = process.env.PORT

AppDataSource.initialize().then(async () => {
    app.use('/api', root_router)

    root_router.get('/', async (req, res) => {
        res.send('TEST')
    })
      
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}).catch(error => console.log(error))
