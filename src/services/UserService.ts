export interface IUser{
    name: string
    email: string
}

const db = [
    {
        name: 'Joana',
        email: 'joana@diobank.me'
    }
];

export class UserService{
    db: IUser[];

    constructor(database = db){
        this.db = database;
    }
    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        db.push(user);
        console.log('db atualizado', this.db);
    }

    getAllUsers = () => {
        return this.db;
    }

    deleteUser = (user: IUser) => {
        const index = db.indexOf(user);
        if (index > -1){
            this.db.splice(index, 1);
        }
    }
}