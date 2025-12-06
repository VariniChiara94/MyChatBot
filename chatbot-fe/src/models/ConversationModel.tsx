import {MessageModel} from "./MessageModel.tsx";

export class ConversationModel {
    id: string;
    title: string;
    createAt?: Date;
    messages?: MessageModel[];


    constructor(id: string, title: string, messages?: MessageModel[], createAt?: Date) {
        this.id = id;
        this.title = title;
        this.createAt = createAt;
        this.messages = messages;
    }
}
