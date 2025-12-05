import {MessageModel} from "./MessageModel.tsx";

export class ChatModel {
    id: string;
    title: string;
    messages?: MessageModel[];
    createAt?: Date;

    constructor(id: string, title: string, messages?: MessageModel[], createAt?: Date) {
        this.id = id;
        this.title = title;
        this.messages = messages;
        this.createAt = createAt;
    }
}
