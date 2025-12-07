import Box from "@mui/material/Box";
import MessageCard from "./MessageCard.tsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useAppContext} from "../../context/AppContext.tsx";
import Stack from "@mui/material/Stack";

export default function Chat() {

    const {getCurrentConversation} = useAppContext();
    const currentConversation = getCurrentConversation();

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