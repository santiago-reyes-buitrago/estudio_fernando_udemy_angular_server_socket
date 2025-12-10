import type {User} from "./user.model.js";

export class UserList {
    private static instance: UserList;
    private users: User[] = [];

    constructor() {
        // if (!UserList.instance) {
        //     UserList.instance = new UserList();
        // }
        // return UserList.instance;
    }

    private getUserId(id: string) {
        return this.users.find(user => user.id === id) || null;
    }

    private getUserChatroom(chatroom: string) {
        return this.users.filter(user => user.chatRoom === chatroom) || null;
    }

    addUser(user: User) {
        this.users.push(user);
        console.log(this.users);
        return user;
    }

    updateNameUser(id: string, name: string) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error('Usuario no existe');
        }
        this.users[index]!.name = name;
    }

    getUsers() {
        return this.users;
    }

    getUserByChatroomOrId<T>(field:string, option: 'chatRoom' | 'id'): T {
        const options:Record<string, Function> = {
            'id': this.getUserId.bind(this),
            'chatRoom': this.getUserChatroom.bind(this)
        };
        if (!options[option]) throw new Error(`Opcion no valida`);
        return options[option](field);
    }

    deleteUser(id: string) {
        const tempUser = this.getUserByChatroomOrId<User>(id,'id');
        this.users = this.users.filter(user => user.id !== id);
        return tempUser;
    }


}