// import { IUser, UserService } from "./UserService"

// describe('UserService', () => { 
//     const mockDb: IUser[] = []
//     const userService = new UserService(mockDb);

//     it('Deve adicionar um novo usuário', () => {
//         const mockConsole = jest.spyOn(global.console, 'log');
//         userService.createUser('natalia', 'natalia@dio.me');
//         expect(mockConsole).toHaveBeenCalledWith('db atualizado', mockDb);
//     })
// }) 

import { UserService } from "./UserService"
import * as jwt from "jsonwebtoken";

jest.mock('../repositories/UserRepository');
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken');

const mockUserRepository = require('../repositories/UserRepository');

describe('UserService', () => { 
    const userService = new UserService(mockUserRepository);
    const mockUser = {
        user_id: '1111',
        name: 'natalia',
        email: 'natalia@dio.me',
        password: '123456'
    }

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser));
        const response = await userService.createUser('natalia', 'natalia@dio.me', '123456');
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject({
            user_id: '1111',
            name: 'natalia',
            email: 'natalia@dio.me',
            password: '123456'
        })
    })

    it('Deve retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser));
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token');
        const token = await userService.getToken('natalia@dio.me', '123456');
        expect(token).toBe('123456');
    })

    it('Deve retornar um erro caso não encontre um usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null));
        await expect(userService.getToken('invalid@test.com', '123456')).rejects.toThrowError(new Error('Email/password invalid!'));

    })
}) 