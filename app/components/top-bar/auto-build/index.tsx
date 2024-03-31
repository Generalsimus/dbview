import React, { useEffect, useMemo } from "react";
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import { getAutoBuildValue, toggleSetAutoBuild } from "./server";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

interface IProps {
}
export const AutoBuild: React.FC<IProps> = React.memo(({ }) => {
    const [value, toggleSwitchValue] = useToggleBool(false);
    console.log("🚀 --> constAutoBuild:React.FC<IProps>=React.memo --> value:", value);
    useEffect(() => {
        getAutoBuildValue().then(v => toggleSwitchValue(v)());
    }, [value]);
    const toggleChange = useMemoCall(async () => {
        toggleSwitchValue()();
        await toggleSetAutoBuild();
    })

    return <>
        <Tooltip title={"Auto Build"} arrow>
            <Switch
                onChange={toggleChange}
                checked={value}
            />
        </Tooltip>
    </>;
});
