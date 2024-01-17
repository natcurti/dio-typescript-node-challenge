import { EntityManager } from "typeorm";

interface mockManagerArgs{
    saveReturn?: object | [object]
    findOneReturn?: object
}

export const getMockEntityManager = async({
    saveReturn = undefined,
    findOneReturn = undefined
}:mockManagerArgs):Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {};

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn));
    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn));

    return manager as EntityManager;
}