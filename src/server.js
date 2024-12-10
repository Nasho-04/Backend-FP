import express from 'express'
import ENVIRONMENT from './config/environment.js'
import authRouter from './rutas/auth.router.js'
import productRouter from './rutas/product.router.js' 
import mongoose from './db/config.js'
import cors from 'cors'

const app = express()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(cors())


app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)

app.listen(ENVIRONMENT.PORT, () => {
    console.dir('Connected to the port number: ' + ENVIRONMENT.PORT)
})