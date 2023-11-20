import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import { useToggleBool } from "../utils/hooks/useToggleBool";
import { useSetProps } from "../utils/hooks/useSetProps";
import { useMemoCall } from "../utils/hooks/useMemoCall";
import { useRouter } from "next/navigation";

interface IProps<DocId = number> {
    title: string,
    docId: DocId,
    deleteFn: (id: DocId) => Promise<void>
}
export const DeleteButtonModal: React.FC<IProps> = React.memo(({ title, docId, deleteFn }) => {
    const {
        value: {
            isOpen,
            isSavingProcess,
        },
        setProps,
        setValue
    } = useSetProps({
        isOpen: false,
        isSavingProcess: false
    });

    const router = useRouter();
    const onClose = useMemoCall(() => {
        setValue({
            isOpen: false,
            isSavingProcess: false
        })
    });
    const onOpen = useMemoCall(() => {
        setProps("isOpen")(true);
    });
    const onDelete = useMemoCall(() => {
        setProps("isSavingProcess")(true);

        deleteFn(docId).then(() => {
            onClose();
            router.refresh();
        }).catch(() => {
            setProps("isSavingProcess")(false);
        });
    });

    const buttonIcon = isSavingProcess ? <CircularProgress
        size={20}
        variant="indeterminate"
    /> : <DeleteIcon />;

    return <>
        <Button
            variant="contained"
            autoFocus
            type="submit"
            color="error"
            startIcon={buttonIcon}
            disabled={isSavingProcess}
            onClick={onOpen}
        >
            Delete
        </Button>
        <Dialog
            open={isOpen || isSavingProcess}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Typography variant="h5">{title}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isSavingProcess} variant="outlined" >Cancel</Button>
                <Button
                    variant="contained"
                    autoFocus
                    color="error"
                    type="submit"
                    disabled={isSavingProcess}
                    onClick={onDelete}
                >
                    {buttonIcon}
                </Button>
            </DialogActions>
        </Dialog>
    </>
});
