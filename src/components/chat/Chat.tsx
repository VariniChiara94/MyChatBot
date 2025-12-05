import Box from "@mui/material/Box";
import MessageCard from "./MessageCard.tsx";
import {MessageModel} from "../../models/MessageModel.tsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useAppContext} from "../../context/AppContext.tsx";
import Stack from "@mui/material/Stack";

const messages: MessageModel[] = [
    {id: 1, text: "Prova di test", date: new Date("2025-12-05T13:40"), owner: "user"},
    {id: 2, text: "Risposta di test", date: new Date("2025-12-05T13:40"), owner: "bot"},
    {id: 3, text: "Prova di test", date: new Date("2025-12-05T13:40"), owner: "user"},
    {id: 4, text: "Risposta di test", date: new Date("2025-12-05T13:40"), owner: "bot"},
    {id: 5, text: "Prova di test", date: new Date("2025-12-05T13:40"), owner: "user"},
    {id: 6, text: "Risposta di test", date: new Date("2025-12-05T13:40"), owner: "bot"},
]

export default function Chat() {

    const {conversations, activeConversationId} = useAppContext();
    const currentConversation = conversations.find(conv => conv.id === activeConversationId);

    return (
        <Box flexGrow={1} sx={{overflow: "hidden", height: "82vh", overflowY: "auto", paddingTop: "20px"}}>
            <Stack alignItems={"center"} alignContent={"center"}>
                <Typography variant={"h3"} align={"center"} height={"1vh"}>
                    {currentConversation?.title}
                </Typography>
                <Divider sx={{width: "70%", my: 5}}/>
            </Stack>
            <Box height={"70vh"} padding={"10px"} sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflow: "auto"
            }}>
                <Stack direction="column" spacing={3} overflow={"auto"}>
                    {currentConversation?.messages?.map((item) => (
                        <MessageCard key={item.id} message={item}/>
                    ))}

                </Stack>
            </Box>
        </Box>


    );
}