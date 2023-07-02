import { UsersMongo } from "../persistencia/dao/mongoDB/managers/usersMongo.js";

const usersMongo = new UsersMongo();

export class UsersManager{
    async getUsers(){
        try{
            const user= await usersMongo.getUsers();
            return user;
        }catch(error){
            return error
        }
    }
    async getUserById(email,password){
        try{
            const user = await usersMongo.getOneUser(email,password);
            return user;
        }catch(error){
            return error
        }
    }
    async getUserById(id){
        try{
            const user = await usersMongo.getUserById(id);
            return user;
        }catch(error){
            return error
        }
    }
    async addUser(obj){
        try{
            const newUser = await usersMongo.addUser(obj);
            return newUser;
        }catch(error){
            return error;
        }
    }
    async updateUser(obj){
        try{
        const updatedUser = await usersMongo.updateUser(obj);
        return updatedUser;
        }catch(error){
            return error;
        }
    }
    async deleteUser(id){
        try{
            const deletedUser = await usersMongo.deleteUser(id);
            return deletedUser;
        }catch(error){
            return error;
        }
    }
}