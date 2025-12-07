import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import {useAppContext} from "../../context/AppContext.tsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {List, ListItem} from "@mui/material";

export default function ReferencesModal() {

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

    const {
        setShowReferenceModal,
        getCurrentConversation,
        currentMessageId
    } = useAppContext();
    const handleClose = () => setShowReferenceModal?.(false);

    const conversation = getCurrentConversation();
    const messageReferences = conversation?.messages?.find(m => m.id === currentMessageId)?.references;

    return (

        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction="column" spacing={2} alignItems="center">
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        References
                    </Typography>
                    <Divider sx={{width: "80%", my: 5}}/>
                    <List sx={{width: "100%"}}>
                        {messageReferences?.map((ref, index) => (
                            <ListItem key={index} disablePadding>
                                <Typography variant="body1" component="span" sx={{mr: 1}}>
                                    {index + 1}.
                                </Typography>
                                <Link href={ref} target="_blank" rel="noopener noreferrer">
                                    {ref}
                                </Link>
                            </ListItem>
                        ))}
                    </List>

                </Stack>
            </Box>
        </Modal>
    );
}