import dotenv from 'dotenv'

dotenv.config()

const ENVIRONMENT = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_USER: process.env.GMAIL_USER,
    JWT_SIGN: process.env.JWT_SIGN,
    API_KEY: process.env.API_KEY
}


export default ENVIRONMENT