import express from 'express'
import ENVIRONMENT from './config/environment.js'
import authRouter from './rutas/auth.router.js'
import productRouter from './rutas/product.router.js' 
import mongoose from './db/config.js'
import cors from 'cors'
import cartRouter from './rutas/cart.router.js'

const corsOptions = {
    origin: ['http://localhost:5173', 'https://frontend-fp-two.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true, limit: '50mb'}))


app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

app.listen(ENVIRONMENT.PORT, () => {
    console.dir('Connected to the port number: ' + ENVIRONMENT.PORT)
})