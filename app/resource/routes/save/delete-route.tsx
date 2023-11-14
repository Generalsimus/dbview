import { useMemoCall, useToggleBool } from "@/app/utils/hooks";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import React, { ReactNode, useMemo, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route";
import { useRouter } from "next/navigation";

interface IProps {
    deleteRouteDoc: (id: number) => Promise<void>
    getActionElement: (args: {
        onClose: () => void,
        setDeleteRoute: (value: MakeAsDbDoc<Route>) => void

    }) => ReactNode
}
export const DeleteRoute: React.FC<IProps> = React.memo(({ deleteRouteDoc, getActionElement }) => {
    const [deleteRoute, setDeleteRoute] = useState<MakeAsDbDoc<Route> | undefined>(undefined)
    const [isSavingProcess, setIsSavingProcess] = useState(false);

    const status = deleteRoute !== undefined


    const onClose = useMemoCall(() => {
        if (!isSavingProcess) {
            setDeleteRoute(undefined)
            setIsSavingProcess(false)
        }
    })
    const router = useRouter();

    const onDelete = useMemoCall(() => {
        if (deleteRoute) {
            setIsSavingProcess(true)
            deleteRouteDoc(deleteRoute.id).then(() => {
                setDeleteRoute(undefined)
                setIsSavingProcess(false)
                router.refresh()
            }).catch(() => setIsSavingProcess(false))
        }
    })
    const actionContent = useMemo(() => getActionElement({ onClose, setDeleteRoute }), [])

    return <>
        <Dialog
            open={status || isSavingProcess}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogContent>
                <Typography variant="h5">Delete "{deleteRouteDoc?.name}" Route?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isSavingProcess} variant="outlined">Cancel</Button>
                <Button
                    variant="contained"
                    autoFocus
                    color="error"
                    type="submit"
                    // startIcon={}
                    disabled={isSavingProcess}
                    onClick={onDelete}
                >
                    {
                        isSavingProcess ? <CircularProgress
                            size={20}
                            variant="indeterminate"
                        /> : <DeleteIcon />}
                </Button>
            </DialogActions>
        </Dialog>

        {actionContent}
    </>;
});
