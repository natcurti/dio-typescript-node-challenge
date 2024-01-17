import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockEntitieManager.mock";
import { User } from "../entities/User";
import { UserRepository } from "./UserRepository";

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let managerMock: Partial<EntityManager>

    const mockUser: User = {
        user_id: '12345',
        name: 'Teste User',
        email: 'teste@email.com',
        password: 'password'
    }

    beforeAll(async() => {
        managerMock = await getMockEntityManager({
            saveReturn: mockUser
        });
        userRepository = new UserRepository(managerMock as EntityManager);
    })

    it('Deve cadastrar um usuário no banco de dados', async () => {
        const response = await userRepository.createUser(mockUser);
        expect(managerMock.save).toHaveBeenCalled();
        expect(response).toMatchObject(mockUser);
    })
})