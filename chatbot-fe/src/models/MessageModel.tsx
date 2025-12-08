export interface MessageModel {
    id: string;
    text: string;
    date: Date;
    owner: 'user' | 'bot';
    files?: File[];
    references?: string[];
}
