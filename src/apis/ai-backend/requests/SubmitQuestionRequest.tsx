export interface SubmitQuestionRequest {
    userId: string;
    question: string;
    files?: File[];
}
