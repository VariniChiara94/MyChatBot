import {Box, Typography} from "@mui/material";
import {MessageModel} from "../models/MessageModel.tsx";

export default function MessageCard({ message }: { message: MessageModel }) {
    const direction = message.owner === "bot" ? "start" : "end";
    return (
        <Box display={"flex"}
             justifyContent={direction}
             textAlign={direction === "end" ? "right" : "left"}>
            <Box>
                <Typography
                    variant={"subtitle2"}
                    padding={"10px"}
                    border={"solid 1px"}
                    borderRadius={"15px"}
                    bgcolor={""}
                >
                    {message.text}
                </Typography>
                <Typography variant={"caption"}>
                    {message.date
                        ? `${message.date.getDate().toString().padStart(2, "0")}/${(message.date.getMonth() + 1).toString().padStart(2, "0")} ${message.date.getHours().toString().padStart(2, "0")}:${message.date.getMinutes().toString().padStart(2, "0")}`
                        : ""}
                </Typography>
            </Box>
        </Box>
    );
}

