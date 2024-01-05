import React, { ReactNode, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Stack } from "@mui/material";
import { useMemoCall } from "../utils/hooks/useMemoCall";
import { useToggleBool } from "../utils/hooks/useToggleBool";
import { useRouter } from "next/navigation";
import { Backdrop, CircularProgress } from "@mui/material";
import { useTheme } from "@emotion/react";

interface IProps {
    open?: boolean
    title?: string
    onOpen?: () => void
    onClose?: () => void
    children?: ReactNode,
    onDelete?: () => void
    onSave?: () => void
    onCancel?: () => void
}
export const FullScreenDialogController: React.FC<IProps> = React.memo(({
    open = true,
    title,
    onOpen,
    onClose,
    children,
    onDelete,
    onSave,
    onCancel,
}) => {
    const [isLoading, initialDefaultValue] = useToggleBool(false);
    const onLoading = initialDefaultValue(true);
    const offLoading = initialDefaultValue(false);
    const router = useRouter();

    const onSafeSave = useMemoCall(async () => {
        onLoading()
        try {
            await onSave?.()
            onClose?.();
            router.refresh();
        } finally {
            offLoading()
        }
    });

    const onSafeDelete = useMemoCall(async () => {
        onLoading()
        try {
            await onDelete?.();
            onClose?.();
            router.refresh();
        } finally {
            offLoading()
        }
    });
    const isDisabled = isLoading;
    const theme = useTheme()

    return <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <Stack position={"sticky"} top={0} display={"flex"} justifyContent={"space-between"} flexDirection={"row"} alignItems={"center"} padding={1}>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {title}
                </Typography>

                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    disabled={isDisabled}
                >
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Stack flex={1}>{children}</Stack>
            <Stack position={"sticky"} bottom={9} display={"flex"} flexDirection={"row"} gap={2} justifyContent={"flex-end"} padding={1}>
                {onCancel && <Button
                    onClick={onCancel}
                    disabled={isDisabled}
                    variant="outlined">Cancel</Button>}
                {onDelete && <Button
                    onClick={onSafeDelete}
                    disabled={isDisabled}
                    variant="contained"
                    autoFocus
                    type="submit"
                    color="error">Delete</Button>}
                {onSave && <Button
                    onClick={onSafeSave}
                    disabled={isDisabled}
                    variant="contained">Save</Button>}
            </Stack>
        </Dialog>
    </>;
});
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});