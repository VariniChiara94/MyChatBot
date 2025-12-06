import {Box, Button, Card, Typography} from "@mui/material";
import {MessageModel} from "../../models/MessageModel.tsx";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PersonIcon from '@mui/icons-material/Person';
import {useAppContext} from "../../context/AppContext.tsx";

export default function MessageCard({message}: { message: MessageModel }) {
    const direction = message.owner === "bot" ? "start" : "end";
    const alignDate = direction === "end" ? "flex-end" : "flex-start";
    const {setShowReferenceModal} = useAppContext();
    return (

        <Box display={"flex"}
             justifyContent={direction}
             textAlign={direction === "end" ? "right" : "left"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {direction === "start" &&
                    <Avatar src="/public/assets/icons8-chatbot-64.png" sx={{border: "1px solid"}}/>}
                <Stack direction={"column"} alignItems={alignDate}>
                    <Card sx={{width: "fit-content", borderRadius: 4, boxShadow: "5"}}>

                        <Typography
                            variant={"subtitle2"}
                            padding={"10px"}
                        >
                            {message.text}
                        </Typography>
                    </Card>
                    <Typography variant={"caption"}>
                        {message.date
                            ? (() => {
                                const dateObj = message.date instanceof Date ? message.date : new Date(message.date);
                                return `${dateObj.getDate().toString().padStart(2, "0")}/${(dateObj.getMonth() + 1).toString().padStart(2, "0")} ${dateObj.getHours().toString().padStart(2, "0")}:${dateObj.getMinutes().toString().padStart(2, "0")}`;
                            })()
                            : ""}
                    </Typography>
                    {message.files && message.files.length > 0 && (
                        <Typography>
                            Attached files: {message.files.map(file => file.name).join(", ")}
                        </Typography>
                    )}
                    {message.references && message.references.length > 0 && (
                        <Button variant="contained" size="small" onClick={() => setShowReferenceModal?.(true)}>
                            References
                        </Button>
                    )}
                </Stack>

                {direction === "end" && <Avatar sx={{border: "1px solid"}}><PersonIcon/></Avatar>}
            </Stack>
        </Box>

    );
}

