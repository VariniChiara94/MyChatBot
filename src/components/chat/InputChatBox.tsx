import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {InputBase} from "@mui/material";
import {useEffect, useState} from "react";
import LoadedFileCard from "./LoadedFileCard.tsx";
import Stack from "@mui/material/Stack";
import {useAppContext} from "../../context/AppContext.tsx";

export default function InputChatBox() {

    const [message, setMessage] = useState("");
    const [files, setFiles] = useState<{ file: File; id: string; }[]>([]);
    const {conversations, activeConversationId, createNewConversation, addMessageToConversation} = useAppContext();
    const currentConversation = conversations.find(conv => conv.id === activeConversationId);

    const handleDeleteFile = (fileId: string) => {
        console.log("Deleted file with id:", fileId);
        setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    }

    const handleSendMessage = () => () => {

        if (currentConversation) {
            const newMessage = {id: crypto.randomUUID(), text: message, owner: "user", date: new Date()}
            addMessageToConversation(activeConversationId ?? "", newMessage)
            setMessage("");

        } else {
            // Create a new conversation if none is active
            const newUuid = createNewConversation("New Conversation");
            const newMessage = {id: crypto.randomUUID(), text: message, owner: "user", date: new Date()}
            addMessageToConversation(newUuid ?? "", newMessage)
            setMessage("");
        }
    }

    useEffect(() => {
        console.log("Received message:", currentConversation)
    }, [currentConversation?.messages]);

    const handleAttachFile = () => () => {
        console.log("Attached files:");
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const selectedFiles = Array.from(event.dataTransfer.files).map(file => ({file, id: crypto.randomUUID()}));
        handleFileSelect(selectedFiles);
    };

    const handleFileSelect = async (selectedFiles: File[]) => {

        // Filtra i file duplicati confrontando il nome
        const uniqueFiles = selectedFiles.filter(
            (newFile) =>
                !files.some(
                    (existingFile) => existingFile.file.name === newFile.name,
                ),
        );
        setFiles(prevFiles => [...prevFiles, ...uniqueFiles]);
    };

    const handleInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files).map(file => ({file, id: crypto.randomUUID()}));
            handleFileSelect(selectedFiles);
        }
    };

    useEffect(() => {
    }, [files]);

    return (
        <Box sx={{
            position: 'absolute', bottom: 0, width: '100%', height: "20vh",
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}
             onDragOver={handleDragOver} onDrop={handleDrop}>

            <Divider sx={{width: "100%", my: 5}}/>


            <Stack direction={"row"} justifyContent={"center"} sx={{width: "80%", height: "auto"}}>
                <Paper
                    component="form"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: "50%",
                        minHeight: "30%",
                        borderRadius: 5,
                        boxShadow: "5"
                    }}
                >
                    <InputBase
                        sx={{ml: 5, flex: 1, fontSize: "1.5rem"}}
                        placeholder={`\nMessage Chatbot`}
                        value={message}
                        multiline
                        minRows={3}
                        maxRows={6}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <IconButton color="primary" sx={{p: '20px', fontSize: '1.7rem', mr: 1}} aria-label="directions"
                                onClick={handleSendMessage()}>
                        <SendIcon sx={{fontSize: 'inherit'}}/>
                    </IconButton>

                    <IconButton color="primary" sx={{p: '20px', fontSize: '1.7rem', mr: 4}} aria-label="directions"
                                onClick={handleAttachFile()} component="label">
                        <AttachFileIcon sx={{fontSize: "inherit"}}/>
                        <input type="file" hidden multiple onChange={handleInputFile}/>
                    </IconButton>
                </Paper>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateRows: "repeat(2, 1fr)",
                        gridAutoFlow: "column",
                        gap: 1,
                        p: 1,
                        minWidth: 200
                    }}
                >
                    {
                        files.map(({file, id}) => (
                            <LoadedFileCard key={id} file={file} onDelete={() => handleDeleteFile(id)}/>
                        ))
                    }
                </Box>
            </Stack>
        </Box>
    );
}