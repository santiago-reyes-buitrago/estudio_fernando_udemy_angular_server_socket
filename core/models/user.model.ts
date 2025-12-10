export class User {
    id: string;
    name: string;
    chatRoom: string;

    constructor(id:string) {
        this.id = id;
        this.name = 'N/A';
        this.chatRoom = 'N/A';
    }
}