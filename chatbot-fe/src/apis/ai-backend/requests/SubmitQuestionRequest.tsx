import {MessageModel} from "../../../models/MessageModel";

export class SubmitQuestionRequest {
    message: MessageModel | undefined;
    engine?: string;
    files?: File[];
}
