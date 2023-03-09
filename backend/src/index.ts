import { AppDataSource } from "./data-source"

import dotenv  from 'dotenv'
import express from 'express'

dotenv.config()

const app     = express()
const port    = process.env.PORT

AppDataSource.initialize().then(async () => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
      
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}).catch(error => console.log(error))
