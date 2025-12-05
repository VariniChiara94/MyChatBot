import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

interface LoadedFileCardProps {
    file: File;
    fileId: string;
    onDelete: () => void;
}

const LoadedFileCard: React.FC<LoadedFileCardProps> = ({file, fileId, onDelete}) => (
    <Card sx={{display: "flex", alignItems: "center", mb: 1}}>
        <CardContent>
            <Typography variant="body1">{file.name}</Typography>
        </CardContent>
        <IconButton aria-label="delete" onClick={onDelete}>
            <CloseIcon/>
        </IconButton>
    </Card>
);

export default LoadedFileCard;