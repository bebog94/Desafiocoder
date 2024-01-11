export default class UsersResponse{
    constructor(user){
        this.first_name = user.name ? user.name.split(" ")[0] : user.first_name,
        this.last_name = user.name ? user.name.split(" ")[user.name.split(" ").length - 1] : user.last_name,
        this.email = user.email;
    }

}