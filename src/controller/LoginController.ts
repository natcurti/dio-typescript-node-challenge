import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { UserService } from "../services/UserService";

const user = {
    id: '1',
    name: 'Natalia Curti',
    email: 'nati@diobank.com',
    password: '123456'
}

export class LoginController{
    userService: UserService

    constructor(userService = new UserService()){
        this.userService = userService;
    }

    login = async (request: Request, response: Response) => {

        // const tokenData = {
        //     name: user.name,
        //     email: user.email
        // }

        // const tokenKey = '123456789';

        // const tokenOptions = {
        //     subject: user.id
        // }

        // const token = sign(tokenData, tokenKey, tokenOptions)

        const {email, password} = request.body;

        try {
            const token = await this.userService.getToken(email, password);
            return response.status(200).json({token});
        } catch(error){
            return response.status(500).json({message: 'Email/password invalid'});
        }

    }
}