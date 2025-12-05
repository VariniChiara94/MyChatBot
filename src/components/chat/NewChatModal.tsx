import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useAppContext} from "../../context/AppContext.tsx";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {useState} from "react";

export default function NewChatModal() {

    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '15px',
        boxShadow: 24,
        p: 4,
    };

    const {createNewConversation, setIsNewConversationModalOpen} = useAppContext();
    const handleClose = () => setIsNewConversationModalOpen(false);
    const [chatName, setChatName] = useState('');

    const handleCreate = () => {
        createNewConversation(chatName);
        setIsNewConversationModalOpen(false);
    }

    return (

        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction="column" spacing={2} alignItems="center">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add a new Chat
                    </Typography>
                    <TextField onChange={(e) => setChatName(e.target.value)} fullWidth variant="outlined">
                        Nome della conversazione
                    </TextField>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={2}>
                        <Button onClick={handleClose} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleCreate} color="primary" variant="contained">
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}