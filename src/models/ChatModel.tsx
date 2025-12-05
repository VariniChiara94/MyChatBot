
export interface ChatModel {
    id: number;
    title: string;
    messages?: string[];
}

const INITIAL_CHATS: ChatModel[] = [
    {
        id: 1,
        title: 'ChatModel 1'
    },
    {
        id: 2,
        title: 'ChatModel 2'
    }
];

export function getChats(): ChatModel[] {
    const stringifiedChats = localStorage.getItem('chats');
    return stringifiedChats ? JSON.parse(stringifiedChats) : INITIAL_CHATS;
}

export function setSessionChats(chats: ChatModel[]) {
    return localStorage.setItem('chats', JSON.stringify(chats));
}
