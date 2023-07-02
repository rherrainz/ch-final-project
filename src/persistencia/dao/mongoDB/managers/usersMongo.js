import { usersModel } from "../models/usersModel.js";

export class UsersMongo{
    async getUsers(){
        try{
            const users = await usersModel.find();
            return users;
        }catch(error){
            console.log(error);
        }
    }
    async getOneUser(email,password){
        try{
            const user = await usersModel.find({email:email, password:password});
            return user;
        }catch(error){
            console.log(error);
        }
    }
    async getUserById(id){
        try{
            const user = await usersModel.findById(id);
            return user;
        }catch(error){
            console.log(error);
        }        
    }
    async addUser(first_name,last_name,email,age,password){
        try{
        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        }
        const newUser = await usersModel.create(user);
        return newUser;
    }catch(error){
        console.log(error);
    }
    }
    async updateUser(id,first_name,last_name,email,age,password){
        try{
        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        }
        const updatedUser = await usersModel.findByIdAndUpdate(id,user);
        return updatedUser;
    }catch(error){
        console.log(error);
    }
    }
    async deleteUser(id){
        try{
        const deletedUser = await usersModel.findByIdAndDelete(id);
        return deletedUser;
        }catch(error){
            console.log(error);
        }
    }
}