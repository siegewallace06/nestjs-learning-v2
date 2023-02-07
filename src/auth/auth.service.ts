import { Injectable } from "@nestjs/common";


@Injectable()
export class AuthService {

    signup() {
        return { msg: "DUMMY SIGNUP" }
    }

    signin() {
        return { msg: "DUMMY SIGNIN" }
    }

}