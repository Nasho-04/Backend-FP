import User from "../models/user.models.js";

class UserRepository {
    static async getByEmail(email) {
        const user = await User.findOne({email})
        return user
    }

    static async getById(id) {
        const user = await User.findById(id)
        return user
    }

    static async saveUser(user) {
        return await user.save()
    }

    static async verifyEmail(user) {
        user.emailVerified = true
        return await UserRepository.saveUser(user)
    }
}

export default UserRepository