export default class UsersDTO {
    constructor(user) {
        this.full_name = `${user.first_name} ${user.last_name}`
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.email = user.email,
        this.age = user.age,
        this.password = user.password,
        this.cart = user.cart,
        this.role = user.role
    }
}