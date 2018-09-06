import { SqlUser } from "../dto/SqlUser";
import { User } from "../model/user";

export function userConverter(user: SqlUser){
    return new User(user.ers_user_id, user.ers_username, undefined, user.user_first_name, user.user_last_name, user.user_email, user.user_role);
}