import React, { ReactNode, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Stack, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { ApproveModal } from "./approve-modal";
import { PickOnTop } from "./pick-on-top";
import { useToggleBool } from "../utils/hooks/useToggleBool";
import { useMemoCall } from "../utils/hooks/useMemoCall";

interface IProps {
    open?: boolean
    disableEffectClose?: boolean
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
    disableEffectClose,
    onCancel,
}) => {
    const [isLoading, initialDefaultValue] = useToggleBool(false);
    const onLoading = initialDefaultValue(true);
    const offLoading = initialDefaultValue(false);
    const router = useRouter();
    const onCloseAndRouteBack = useMemoCall(() => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("form");
        router.push(`${window.location.pathname}?${searchParams.toString()} `);
        onClose?.();
    })

    const onSafeSave = useMemoCall(async () => {
        onLoading()
        try {
            await onSave?.()
            if (!disableEffectClose) {
                onCloseAndRouteBack?.();
                router.refresh();
            }
        } finally {
            offLoading()
        }
    });

    const onSafeDelete = useMemoCall(async () => {
        onLoading()
        try {
            await onDelete?.();
            if (!disableEffectClose) {
                onCloseAndRouteBack?.();
                router.refresh();
            }
        } finally {
            offLoading()
        }
    });
    const isDisabled = isLoading;
    const theme = useTheme()
    return <>
        {/* <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop> */}
        <Dialog
            fullScreen
            open={open}
            onClose={onCloseAndRouteBack}
            TransitionComponent={Transition}
        >
            <Stack position={"sticky"} top={0} display={"flex"} justifyContent={"space-between"} flexDirection={"row"} alignItems={"center"} padding={1}>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {title}
                </Typography>
                <PickOnTop />
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onCloseAndRouteBack}
                    aria-label="close"
                    disabled={isDisabled}
                >
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Stack flex={1}>{children}</Stack>
            <Stack zIndex={theme.zIndex.appBar} bgcolor={theme.palette.background.default} position={"sticky"} bottom={0} display={"flex"} flexDirection={"row"} gap={2} justifyContent={"flex-end"} padding={1}>
                <Button onClick={onCloseAndRouteBack} disabled={isDisabled} autoFocus size="small">Cancel</Button>
                {onDelete && <ApproveModal
                    title="Are you sure to delete?"
                    approveContent="Delete"
                    rejectContent="Cancel"
                    approveButtonColor="error"
                    onApprove={onSafeDelete}
                    getModalOpenerNode={(onOpen) => {
                        return <Button
                            onClick={onOpen}
                            disabled={isDisabled}
                            variant="contained"
                            autoFocus
                            type="submit"
                            color="error">Delete</Button>
                    }}
                />}
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