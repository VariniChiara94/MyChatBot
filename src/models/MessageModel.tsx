export interface MessageModel {
    id: number;
    text: string;
    date: Date;
    owner: 'user' | 'bot';
    files?: File[];
}
