// export interface IUser{
//     name: string
//     email: string
// }

// const db = [
//     {
//         name: 'Joana',
//         email: 'joana@diobank.me'
//     }
// ];

import { AppDataSource } from "../database";
import { UserRepository } from "../repositories/UserRepository"
import { User } from "../entities/User";
import { sign } from "jsonwebtoken";

export class UserService{
    // db: IUser[];

    // constructor(database = db){
    //     this.db = database;
    // }

    private userRepository: UserRepository;

    constructor(userRepository = new UserRepository(AppDataSource.manager)){
        this.userRepository = userRepository;
    }

    createUser = async (name: string, email: string, password: string):Promise<User> => {
        // const user = {
        //     name,
        //     email
        // }
        // db.push(user);
        // console.log('db atualizado', this.db);

        const user = new User(name, email, password);
        return this.userRepository.createUser(user);
    }

    // getAllUsers = () => {
    //     // return this.db;
    // }

    // deleteUser = (user: IUser) => {
    //     const index = db.indexOf(user);
    //     if (index > -1){
    //         this.db.splice(index, 1);
    //     }
    // }

    getUser = async (userId: string):Promise<User | null> => {
        return this.userRepository.getUser(userId);
    }

    getAuthenticatedUser = async (email: string, password: string):Promise<User | null> => {
        return this.userRepository.getUserByEmailAndPassowrd(email, password);
    }

    getToken = async (email: string, password: string):Promise<string> => {
        const user = await this.getAuthenticatedUser(email, password);

        if(!user){
            throw new Error('Email/password invalid!')
        }

        const tokenData = {
            name: user?.name,
            email: user?.email
        }

        const tokenKey = '123456789';

        const tokenOptions = {
            subject: user?.user_id
        }

        const token = sign(tokenData, tokenKey, tokenOptions);
        return token
    }
}