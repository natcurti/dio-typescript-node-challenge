import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    userService: UserService;

    constructor(userService = new UserService){
        this.userService = userService;
    }

    createUser = (request: Request, response: Response) => {
        const user = request.body;

        if(!user.name){
            return response.status(400).json({message: 'Bad Request: name obrigatório'});
        }

        if(!user.email){
            return response.status(400).json({message: 'Bad Request: email obrigatório'});
        }

        if(!user.password){
            return response.status(400).json({message: 'Bad Request: password incorreto'});
        }

        this.userService.createUser(user.name, user.email, user.password);
        return response.status(201).json({message: "Usuário criado"})
    }

    getUser = async (request: Request, response: Response) => {
        const {userId} = request.params;
        const user = await this.userService.getUser(userId);
        return response.status(200).json({
            userId: user?.user_id,
            name: user?.name,
            email: user?.email
        });

    }
    // getAllUsers = (request: Request, response: Response) => {
    //     const users = this.userService.getAllUsers();
    //     return response.status(200).json(users);
    // }

    // deleteUser = (request: Request, response: Response) => {
    //     const user = request.body;
    //     this.userService.deleteUser(user);
    //     return response.status(200).json({message: 'Usuário deletado com sucesso!'})
    // }
}