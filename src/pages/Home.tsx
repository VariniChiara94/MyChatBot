import HomeLayout from '../components/HomeLayout';
import Chat from "../components/chat/Chat.tsx";
import Stack from "@mui/material/Stack";
import {ChatbotPngOnlyRobotIcon} from "../components/signin/CustomIcons.tsx";
import Typography from "@mui/material/Typography";
import InputChatBox from "../components/chat/InputChatBox.tsx";
import {useAppContext} from "../context/AppContext.tsx";
import NewChatModal from "../components/chat/NewChatModal.tsx";

export default function Home() {

    const {activeConversationId, isNewConversationModalOpen, conversations} = useAppContext();
    const currentConversation = conversations.find(conv => conv.id === activeConversationId);
    const showWelcome = (activeConversationId == null || currentConversation == undefined);

    return (

        <HomeLayout>
            {isNewConversationModalOpen && <NewChatModal/>}
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
