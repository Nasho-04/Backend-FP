import ResponseBuilder from "../utils/Response.Builder.js";
import UserRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from "../utils/mail.util.js";
import ENVIRONMENT from "../config/environment.js";
import User from "../models/user.models.js"; 

export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existentUser = await UserRepository.getByEmail(email)

        if (existentUser) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('This email has already been registered')
            .setPayload({
                detail: 'This email has already been registered'
            })
            .build()
            return res.json(response)
        }

        if (!name || !email || !password) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('All fields are required')
            .setPayload({
                detail: 'All fields are required'
            })
            .build()
            return res.json(response)
        }

        if (password.length < 5) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Password must be at least 5 characters')
            .setPayload({
                detail: 'Password must be at least 5 characters'
            })
            .build()
            return res.json(response)
        }

        if (!email.includes('@')) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Invalid email')
            .setPayload({
                detail: 'Invalid email'
            })
            .build()
            return res.json(response)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = jwt.sign({email}, ENVIRONMENT.JWT_SIGN, {expiresIn: '1d'})
        const URL_VERIFICATION = `https://backend-fp.vercel.app/api/auth/verify/${verificationToken}`

        
        const newUser = new User({name, email, password: hashedPassword, emailVerified: false, verificationToken})
        await UserRepository.saveUser(newUser)

        await sendMail({
            to: email,
            subject: 'Verify your email',
            html: `
            <h1>Verify your email</h1>
            <p><b>Click the link below to verify your email</b></p>
            <a href="${URL_VERIFICATION}">Verify your email</a>
            `
        })


        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('User created successfully')
        .setPayload({
            detail: 'User created successfully'
        })
        .build()
        return res.json(response)

    } catch (error) {
        console.log(error)
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Internal server error')
        .setPayload({
            detail: error.message
        })
        .build()
        return res.json(response)
    }
}

export const verifyMailValidationTokenController = async (req, res) => {
    try {
        const { verification_token } = req.params
        if (!verification_token) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Verification token is required')
            .setPayload({
                detail: 'Verification token is required'
            })
            .build()
            return res.json(response)
        }
        const decodedToken = jwt.verify(verification_token, ENVIRONMENT.JWT_SIGN)
        const user = await UserRepository.getByEmail(decodedToken.email)
        if (!user) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('User not found')
            .setPayload({
                detail: 'User not found'
            })
            .build()
            return res.json(response)
        }
        UserRepository.verifyEmail(user)
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Email verified successfully')
        .setPayload({
            detail: 'Email verified successfully'
        })
        .build()
        return res.render('main', response)
    } catch (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Internal server error')
        .setPayload({
            detail: error.message
        })
        .build()
        return res.json(response)
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserRepository.getByEmail(email)
        if (!user) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('User not found')
            .setPayload({
                detail: 'User not found'
            })
            .build()
            return res.json(response)
        }
        if (!user.emailVerified) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage('Email not verified')
            .setPayload({
                detail: 'Email not verified'
            })
            .build()
            return res.json(response)
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage('Invalid password')
            .setPayload({
                detail: 'Invalid password'
            })
            .build()
            return res.json(response)
        }
        const token = jwt.sign({email, id: user._id, role: user.role}, ENVIRONMENT.JWT_SIGN, {expiresIn: '1d'})

        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Login successful')
        .setPayload({
            detail: 'Login successful',
            token,
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
                role: user.role
            }
        })
        .build()
        return res.json(response)
    } catch (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Internal server error')
        .setPayload({
            detail: error.message
        })
        .build()
        return res.json(response)
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const {email} = req.body
        if (!email) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Email is required')
            .setPayload({
                detail: 'Email is required'
            })
            .build()
            return res.json(response)
        }
        const user = await UserRepository.getByEmail(email)
        if (!user) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('User not found')
            .setPayload({
                detail: 'User not found'
            })
            .build()
            return res.json(response)
        }
        const resetToken = jwt.sign({email}, ENVIRONMENT.JWT_SIGN, {expiresIn: '1d'})
        const resetURL = `https://frontend-fp-two.vercel.app/reset-password/${resetToken}`

        await sendMail({
            to: email,
            subject: 'Reset your password',
            html: `
            <h1>Reset your password</h1>
            <p><b>Click the link below to reset your password</b></p>
            <a href="${resetURL}">Reset your password</a>
            `
        })

        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Email sent successfully')
        .setPayload({
            detail: 'Email sent successfully'
        })
        .build()
        return res.json(response)
    } catch (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Internal server error')
        .setPayload({
            detail: error.message
        })
        .build()
        return res.json(response)
    }
}

export const resetTokenController = async (req, res) => {
    try {
        const {reset_token} = req.params
        const {password} = req.body
        if (!reset_token) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Reset token is required')
            .setPayload({
                detail: 'Reset token is required'
            })
            .build()
            return res.json(response)
        }
        const decoded = jwt.verify(reset_token, ENVIRONMENT.JWT_SIGN)
        if (!decoded) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage('Invalid reset token')
            .setPayload({
                detail: 'Invalid reset token'
            })
            .build()
            return res.json(response)
        }
        const user = await UserRepository.getByEmail(decoded.email)
        if (!user) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('User not found')
            .setPayload({
                detail: 'User not found'
            })
            .build()
            return res.json(response)
        }
        if (!user.emailVerified) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage('Email not verified')
            .setPayload({
                detail: 'Email not verified'
            })
            .build()
            return res.json(response)
        }
        if (!password) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Password is required') 
            .setPayload({
                detail: 'Password is required'
            })
            .build()
            return res.json(response)
        }

        if (password.length < 5) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Password must be at least 5 characters long')
            .setPayload({
                detail: 'Password must be at least 5 characters long'
            })
            .build()
            return res.json(response)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        await UserRepository.saveUser(user)
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Password reset successful')
        .setPayload({
            detail: 'Password reset successful'
        })
        .build()
        return res.json(response)

    } catch (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Internal server error')
        .setPayload({
            detail: error.message
        })
        .build()
        return res.json(response)
    }
}