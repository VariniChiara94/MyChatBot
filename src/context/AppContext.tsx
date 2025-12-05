import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {ChatModel} from "../models/ChatModel.tsx";

interface AppContextType {
    conversations: ChatModel[];
    activeConversationId: string | null;
    setActiveConversationId: Dispatch<SetStateAction<string | null>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    createNewConversation: (title?: string) => string;
    deleteConversation: (id: string) => void;
    clearAllConversations: () => void;
    getCurrentConversation: () => ChatModel | undefined;
    setConversations: Dispatch<SetStateAction<ChatModel[]>>;
    updateConversationTitle: (conversationId: string, title: string) => void;
    addMessageToConversation: (conversationId: string, message: any) => void;
    isNewConversationModalOpen: boolean;
    setIsNewConversationModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType>({
    conversations: [],
    activeConversationId: null,
    setActiveConversationId: () => {
    },
    isLoading: false,
    setIsLoading: () => {
    },
    createNewConversation: () => "",
    deleteConversation: () => {
    },
    clearAllConversations: () => {
    },
    getCurrentConversation: () => undefined,
    setConversations: () => {
    },
    updateConversationTitle: () => {
    },
    addMessageToConversation: () => {
    },
    isNewConversationModalOpen: false,
    setIsNewConversationModalOpen: () => {
    },
});

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within AppContextProvider");
    }
    return context;
}

export const conversationsKey = "conversations";
export const activeConversationIdKey = "activeConversationId";

export const AppContextProvider = ({children}: { children: any }) => {

    const [conversations, setConversations] = useState(() => {
        const saved = localStorage.getItem(conversationsKey);
        return saved ? JSON.parse(saved) : [];
    })

    const [activeConversationId, setActiveConversationId] = useState(() => {
        return localStorage.getItem(activeConversationIdKey) || null;
    })

    const [isLoading, setIsLoading] = useState(false);
    const [isNewConversationModalOpen, setIsNewConversationModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(conversationsKey, JSON.stringify(conversations));
    }, [conversations])

    useEffect(() => {
        if (activeConversationId) {
            localStorage.setItem(activeConversationIdKey, JSON.stringify(activeConversationId));
        } else {
            localStorage.removeItem(activeConversationIdKey);
        }

    }, [activeConversationId])

    const createNewConversation = (title?: string) => {
        const newId = crypto.randomUUID()
        const t = title && title.trim().length > 0 ? title : "Chat " + newId;
        const conversation: ChatModel = new ChatModel(newId, t, [], new Date(Date.now()));

        setConversations((prev: any) => [conversation, ...prev]);
        setActiveConversationId(newId)
        return newId
    }

    const deleteConversation = (id: string) => {
        setConversations((prev: any) => prev.filter((c: { id: string; }) => c.id !== id));

        if (activeConversationId === id) {
            setActiveConversationId(null);
        }
    }

    const clearAllConversations = () => {
        setConversations([]);
        setActiveConversationId(null);
        localStorage.removeItem(conversationsKey);
        localStorage.removeItem(activeConversationIdKey);
    }

    const getCurrentConversation = () => {
        return conversations.find((conv: ChatModel) => conv.id !== activeConversationId);
    }

    const addMessageToConversation = (conversationId: string, message: any) => {
        setConversations((prev: any) =>
            prev.map((conv: ChatModel) => {
                if (conv.id === conversationId) {
                    return {
                        ...conv,
                        messages: Array.isArray(conv.messages) ? [...conv.messages, message] : [message]
                    }
                } else {
                    return conv;
                }
            })
        );
    }

    const updateConversationTitle = (conversationId: string, title: string) => {
        setConversations((prev: any) =>
            prev.map((conv: ChatModel) => {
                if (conv.id === conversationId) {
                    const t = title.length > 10 ? title.substring(0, 10) + "..." : title;
                    return {
                        ...conv,
                        t
                    }
                } else {
                    return conv;
                }
            })
        );
    }

    const contextValue = {
        conversations,
        activeConversationId,
        setActiveConversationId,
        isLoading,
        setIsLoading,
        createNewConversation,
        deleteConversation,
        clearAllConversations,
        getCurrentConversation,
        setConversations,
        updateConversationTitle,
        addMessageToConversation,
        isNewConversationModalOpen,
        setIsNewConversationModalOpen
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
