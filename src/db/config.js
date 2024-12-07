import mongoose from 'mongoose'
import ENVIRONMENT from '../config/environment.js'

mongoose.connect(ENVIRONMENT.MONGO_URL) 
.then(() => {
    console.dir('DB connection done, connected to: ' + ENVIRONMENT.MONGO_URL)
})
.catch((error) => {
    console.error('DB connection failed: ' + error)
})

export default mongoose