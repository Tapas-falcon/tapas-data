import React, { MouseEventHandler } from "react";
import { Avatar, AvatarProps } from "@mui/joy";
import { AddIcon } from "../icons";

export type ImageButtonProps = AvatarProps & {src?: string, onChoose?: MouseEventHandler}

export const ImageButton: React.FC<ImageButtonProps> = function({
    src, 
    onChoose=()=>{},
    sx={},
}) {
    const borderWithImage = '1px solid var(--surface-sf-overlay-80-w, rgba(255, 255, 255, 0.80))';
    const borderNoImage = '1px dashed var(--border-border-primary, rgba(0, 0, 0, 0.12))';


    return (<Avatar sx={{
        width: 24,
        height: 24,
        backgroundColor: 'transparent',
        border: src ? borderWithImage : borderNoImage,
        cursor: 'pointer',
        ...sx
    }} src={src} onClick={onChoose}>
        {src ? <></> : <AddIcon size={20}/>}
    </Avatar>)
}

