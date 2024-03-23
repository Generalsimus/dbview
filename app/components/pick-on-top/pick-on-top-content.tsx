
import React, { createContext, useMemo } from "react";
import { ButtonBase, IconButton, Paper, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";
import { createPortal } from 'react-dom';
import { getFullPath, getPIckOnTopIndexedDBStorage } from './utils';
import { useSignalRefresh } from "@/app/utils/hooks/useSignalRefresh";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import DeleteIcon from '@mui/icons-material/Delete';


export const PickOnTopContentContext = createContext(() => { })
interface IProps {
    children: React.ReactNode
}
export const PickOnTopContent: React.FC<IProps> = React.memo(({ children }) => {
    // const pIckOnTopIndexedDBStorage = useMemo(getPIckOnTopIndexedDBStorage, [])
    // return children
    const router = useRouter();
    const pIckOnTopIndexedDBStorage = useMemo(getPIckOnTopIndexedDBStorage, [])

    const [stickDocs, refreshIndexDbDocs] = useSignalRefresh(async () => {
        return await pIckOnTopIndexedDBStorage.getAll()
    })


    const onTogglePin = useMemoCall(async () => {
        const currentPath = getFullPath()
        const alreadyPinnedDoc = stickDocs?.find(doc => doc.path === currentPath);

        if (alreadyPinnedDoc) {

            await pIckOnTopIndexedDBStorage.delete(alreadyPinnedDoc.INDEXED_DB_PICK_ID);
        } else {

            await pIckOnTopIndexedDBStorage.put({
                title: "delete",
                path: currentPath
            })
        }
        refreshIndexDbDocs();
    })
    return <PickOnTopContentContext.Provider value={onTogglePin}>
        {children}
        {createPortal(
            <Stack position="fixed" bottom={20} left={20} gap={1} zIndex={(theme) => theme.zIndex.tooltip}>

                {stickDocs?.map(doc => {


                    return <Paper elevation={4} >
                        <ButtonBase sx={{ display: "flex", flexDirection: "row", alignItems: "center", padding: '5px 10px' }} onClick={() => {
                            router.push(doc.path)

                        }}>
                            <DeleteIcon />
                            <Typography>{doc.title}</Typography>
                            <IconButton size="small" onClick={async () => {
                                await pIckOnTopIndexedDBStorage.delete(doc.INDEXED_DB_PICK_ID);
                                refreshIndexDbDocs();
                            }}>
                                <CloseIcon />
                            </IconButton>
                        </ButtonBase>
                    </Paper>
                })}

            </Stack>,
            document.body
        )}
    </PickOnTopContentContext.Provider>;
});
