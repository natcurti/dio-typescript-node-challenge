import { UserController } from "./UserController";
import { UserService } from "../services/UserService";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";

describe('UserController', () => {
    
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    };

    const userController = new UserController(mockUserService as UserService);
    
    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'natalia',
                email: 'natalia@dio.me'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({message: 'Usuário criado'})
    })

    it('Deve retornar uma mensagem de erro caso o usuário não informe um nome válido', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'natalia@dio.me'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request: name obrigatório'});
    })

    it('Deve retornar uma mensagem de erro caso o usuário não informe um email válido', () => {
        const mockRequest = {
            body: {
                name: 'Natalia',
                email: ''
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request: email obrigatório'});
    })

    it('A função getAllUsers deve ser chamada', () => {
        const mockRequest = {
            body: {
                name: 'natalia',
                email: 'natalia@dio.me'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockUserService.getAllUsers).toBeCalled();
    })

    it('Deve deletar o usuário', () => {
        const mockRequest = {
            body: {
                name: 'Natalia',
                email: 'natalia@dio.me'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({message: 'Usuário deletado com sucesso!'});
    })

})