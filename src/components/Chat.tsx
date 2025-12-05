import Box from "@mui/material/Box";
import MessageCard from "./MessageCard.tsx";
import {MessageModel} from "../models/MessageModel.tsx";

const messages: MessageModel[] = [
    { id: 1, text: "Prova di test", date: new Date("2025-12-05T13:40"), owner: "user" },
    { id: 2, text: "Risposta di test", date: new Date("2025-12-05T13:40"), owner: "bot" },
    { id: 3, text: "Prova di test", date: new Date("2025-12-05T13:40"), owner: "user" },
    { id: 4, text: "Risposta di test", date: new Date("2025-12-05T13:40"), owner: "bot" },
    { id: 5, text: "Prova di test", date: new Date("2025-12-05T13:40"), owner: "user" },
    { id: 6, text: "Risposta di test", date: new Date("2025-12-05T13:40"), owner: "bot" },
]

export default function Chat() {
    return (
        <Box flexGrow={1} sx={{ overflow: "hidden", height: "82vh", overflowY: "hidden", paddingTop:"20px"}}>

            <Box height={"80vh"} padding={"10px"} sx={{ display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflow: "auto"}}>

                {messages.map((item) => (
                    <MessageCard key={item.id} message={item} />
                ))}

            </Box>
        </Box>


    );
}