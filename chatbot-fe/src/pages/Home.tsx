import HomeLayout from '../components/HomeLayout';
import Chat from "../components/chat/Chat.tsx";
import Stack from "@mui/material/Stack";
import {ChatbotPngOnlyRobotIcon} from "../components/signin/CustomIcons.tsx";
import Typography from "@mui/material/Typography";
import InputChatBox from "../components/chat/InputChatBox.tsx";
import {useAppContext} from "../context/AppContext.tsx";
import NewChatModal from "../components/chat/NewChatModal.tsx";
import ReferencesModal from "../components/chat/ReferencesModal.tsx";
import {useEffect} from "react";
import {getUserConversations} from "../apis/ai-backend/AIBackendService.tsx";

export default function Home() {

    const {
        activeConversationId,
        isNewConversationModalOpen,
        getCurrentConversation,
        showReferenceModal,
        setConversations
    } = useAppContext();
    const currentConversation = getCurrentConversation();
    const showWelcome = (activeConversationId == null || currentConversation == undefined);

    useEffect(() => {

        const fetchUserConversations = async () => {
            try {
                const conv = await getUserConversations();
                setConversations(conv)
            } catch {
                //TODO handle error
            }

        }
        fetchUserConversations();
    }, []);

    return (

        <HomeLayout>
            {isNewConversationModalOpen && <NewChatModal/>}
            {showReferenceModal && <ReferencesModal/>}
            <Stack direction="column" spacing={2}>
                {showWelcome ? (
                    <Stack direction={"column"} alignItems={"center"} spacing={2} paddingTop={50}>
                        <ChatbotPngOnlyRobotIcon/>
                        <Typography variant="h2" component="div">
                            How can I help you today?
                        </Typography>
                    </Stack>) : (
                    <Chat/>
                )
                }

                {/* Input text box */}
                <InputChatBox/>
            </Stack>

        </HomeLayout>
    );
}
