import {MessageModel} from "../../../models/MessageModel";

export class SubmitQuestionResponse {
    data: { message: MessageModel; } | undefined;
    details: string | undefined;
    app_status_code: number | undefined;
}

