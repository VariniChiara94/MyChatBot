import {Box, Card, Typography} from "@mui/material";
import {MessageModel} from "../../models/MessageModel.tsx";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PersonIcon from '@mui/icons-material/Person';

export default function MessageCard({message}: { message: MessageModel }) {
    const direction = message.owner === "bot" ? "start" : "end";
    return (

        <Box display={"flex"}
             justifyContent={direction}
             textAlign={direction === "end" ? "right" : "left"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {direction === "start" &&
                    <Avatar src="/public/assets/icons8-chatbot-64.png" sx={{border: "1px solid"}}/>}
                <Card sx={{width: "fit-content", borderRadius: 4, boxShadow: "5"}}>

                    <Typography
                        variant={"subtitle2"}
                        padding={"10px"}
                    >
                        {message.text}
                    </Typography>
                    <Typography variant={"caption"}>
                        {message.date
                            ? `${message.date.getDate().toString().padStart(2, "0")}/${(message.date.getMonth() + 1).toString().padStart(2, "0")} ${message.date.getHours().toString().padStart(2, "0")}:${message.date.getMinutes().toString().padStart(2, "0")}`
                            : ""}
                    </Typography>
                </Card>
                {direction === "end" && <Avatar sx={{border: "1px solid"}}><PersonIcon/></Avatar>}
            </Stack>
        </Box>

    );
}

