"use client"
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import SaveIcon from '@mui/icons-material/SaveAs';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { useMemoCall, useSetProps, useToggleBool, useValidation } from "@/app/utils/hooks";
import { RequestMethodType, requestMethods } from "@/basic/request";
import { Route, RouteSchema } from "@/basic/models/route";
import { DeepPartial } from "@/basic/generics";
import { useRouter } from "next/navigation";
import { ExtendDbKeys, PartialDbKeys, partialDbKeySchema } from "@/basic/db-basic-schema";
import { DrawerView } from "./drawer-view";
import { SaveRouteForm } from "./form";


// interface IProps {
//     saveRouteDoc: (value: PartialDbKeys<ExtendDbKeys<Route>>) => Promise<void>
//     initialStateValue?: DeepPartial<ExtendDbKeys<Route>>

//     title: string
//     status: boolean
//     onOpen: () => void
//     onClose: () => void
// }
// export const SaveRouteForm:

interface IProps {
    getViewButton: (onOpen: () => void) => ReactNode

    saveRouteDoc: (value: PartialDbKeys<ExtendDbKeys<Route>>) => Promise<void>
    initialStateValue?: DeepPartial<ExtendDbKeys<Route>>
}
export const SaveRouteView: React.FC<IProps> = React.memo(({ getViewButton, initialStateValue, saveRouteDoc }) => {


    const [modalStatus, setModalStatus, setModalStatusValue] = useToggleBool(false)


    const handleClickOpen = setModalStatus(true);
    const handleClickClose = setModalStatus(false);


    return <>
        {/* "Add New Route Path" */}
        <SaveRouteForm
            title="Add New Route Path"
            initialStateValue={initialStateValue}
            status={modalStatus}
            onClose={handleClickClose}
            saveRouteDoc={saveRouteDoc}
        />
        {getViewButton(handleClickOpen)}
    </>
});

