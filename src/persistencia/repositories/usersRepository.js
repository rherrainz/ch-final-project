import UsersDTO from "../dto/usersDTO.js";
import UsersRespDTO from "../dto/usersRespDTO.js";

export default class UsersRepository {
    constructor(dao){
        this.dao = dao
    }

    async createUser(user){
        const userDBDTO = new UsersDTO(user)
        const userDao = await this.dao.createUser(userDBDTO)
        const userRespDTO = new UsersRespDTO(userDao)
        return userRespDTO
    }
}