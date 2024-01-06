import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { Component, ComponentProps, ReactNode, useState } from "react";
import { useToggleBool } from "../utils/hooks/useToggleBool";
import { useSetProps } from "../utils/hooks/useSetProps";
import { useMemoCall } from "../utils/hooks/useMemoCall";
import { useRouter } from "next/navigation";

interface IProps {
    title: string,
    approveContent: ReactNode
    rejectContent: ReactNode
    onApprove: () => void
    onReject?: () => void
    getModalOpenerNode: (onOpen: () => void) => ReactNode,
    approveButtonColor: ComponentProps<typeof Button>["color"]
}
export const ApproveModal: React.FC<IProps> = React.memo(({ onApprove, onReject, getModalOpenerNode, title, approveContent, rejectContent, approveButtonColor }) => {
    const [open, initialDefaultOpen] = useToggleBool(false)
    const onClose = initialDefaultOpen(false);
    const onOpen = initialDefaultOpen(true);


    const [isLoading, initialDefaultLoading] = useToggleBool(false)
    const onLoading = initialDefaultLoading(false);
    const offLoading = initialDefaultLoading(true);

    const onSafeReject = useMemoCall(async () => {
        try {
            onLoading()
            await onReject?.();
        } finally {
            offLoading();
            onClose();
        }
    })
    const onSafeApprove = useMemoCall(async () => {
        try {
            onLoading()
            await onApprove()
        } finally {
            offLoading();
            onClose();
        }
    })
    return <>
        {getModalOpenerNode(onOpen)}
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Typography variant="h5">{title}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSafeReject} disabled={isLoading} variant="outlined" >{rejectContent}</Button>
                <Button
                    variant="contained"
                    autoFocus
                    color={approveButtonColor} 
                    type="submit"
                    disabled={isLoading}
                    onClick={onSafeApprove}
                >
                    {approveContent}
                </Button>
            </DialogActions>
        </Dialog >
    </>
});
