import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {InputBase} from "@mui/material";

export default function InputChatBox() {
    return (
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%', px: 2, height: "20vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Divider sx={{ width: "100%", my:5}} />
            <Paper
                component="form"
                sx={{ display: 'flex', alignItems: 'center', width: "50%", height: "30%", borderRadius: 5 }}
            >
                <InputBase
                    sx={{ ml: 5, flex: 1, fontSize: "1.5rem" }}
                    placeholder="MessageModel Chatbot"

                />
                <IconButton color="primary" sx={{ p: '20px', fontSize: '1.7rem',  mr: 1 }} aria-label="directions">
                    <SendIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
                <IconButton color="primary" sx={{ p: '20px', fontSize: '1.7rem',  mr: 4 }} aria-label="directions">
                    <AttachFileIcon sx={{ fontSize: "inherit" }} />
                </IconButton>
            </Paper>
        </Box>
    );
}