import { usersModel } from "../models/users.model.js";

export default class UsersManager{
    async getUsers(email,password){
        const user = await usersModel.find({email:email, password:password});
        return user;
    }
    async getUserById(id){
        const user = await usersModel.findById(id);
        return user;
    }
    async addUser(first_name,last_name,email,age,password){
        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        }
        const newUser = await usersModel.create(user);
        return newUser;
    }
    async updateUser(id,first_name,last_name,email,age,password){
        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        }
        const updatedUser = await usersModel.findByIdAndUpdate(id,user);
        return updatedUser;
    }
    async deleteUser(id){
        const deletedUser = await usersModel.findByIdAndDelete(id);
        return deletedUser;
    }
}