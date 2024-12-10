import express from 'express'
import ENVIRONMENT from './config/environment.js'
import authRouter from './rutas/auth.router.js'
import productRouter from './rutas/product.router.js' 
import mongoose from './db/config.js'
import cors from 'cors'
import handlebars from 'express-handlebars'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')


app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/', (req, res) => res.send('Hello World!'))

app.listen(ENVIRONMENT.PORT, () => {
    console.dir('Connected to the port number: ' + ENVIRONMENT.PORT)
})