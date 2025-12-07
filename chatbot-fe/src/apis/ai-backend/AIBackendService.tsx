import {ConversationModel} from "../../models/ConversationModel.tsx";
import axios from "axios";
import {SubmitQuestionRequest} from "./requests/SubmitQuestionRequest.tsx";
import {SubmitQuestionResponse} from "./responses/SubmitQuestionResponse.tsx";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8090/api'
});

export const getUserConversations = async (): Promise<ConversationModel[]> => {

    try {

        const response = await apiClient.get(`/v1/conversations/get/mock_user`);

        if (response.status !== 200) {
            console.error("Error getting conversations");
        }

        return response.data.data.user_conversations as ConversationModel[];
    } catch (error: any) {
        console.error("Error getting conversations catch", error);
        throw error;
    }
};

export const submitQuestion = async (
    request: SubmitQuestionRequest,
): Promise<SubmitQuestionResponse> => {

    try {
        const response = await apiClient.post(`/v1/question`, request);

        if (response.status !== 200) {
            console.error("Error getting response for your question", response.status);
        }

        return response.data as SubmitQuestionResponse;
    } catch (error: any) {
        console.error("Error getting response for your question catch", error);
        throw error;
    }
};


