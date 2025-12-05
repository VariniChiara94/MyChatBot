export class ChatModel {
    id: string;
    title: string;
    messages?: string[];
    createAt?: Date;

    constructor(id: string, title: string, messages?: string[], createAt?: Date) {
        this.id = id;
        this.title = title;
        this.messages = messages;
        this.createAt = createAt;
    }
}
