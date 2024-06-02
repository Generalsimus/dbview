import React from "react";
import { Breadcrumbs, Button, Stack } from "@mui/material";
import { default as MUILink } from '@mui/material/Link';
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface IProps {
    children: React.ReactNode
    title: string,
    onDelete?: () => void
    onSave?: () => void,
    startBreadcrumbs?: { title: string, href: string }[]
    isEdit?: boolean
}
export const FromContainer: React.FC<IProps> = React.memo(({ isEdit, title, startBreadcrumbs = [], children, onDelete, onSave }) => {

    const searchParams = useSearchParams();

    const pathname = usePathname();
    const currantRouteLocation = `${pathname}${searchParams.size ? `?${searchParams}` : ""}`
    return <>
        <Stack position={"sticky"} bottom={0} display={"flex"} flexDirection={"column"} gap={2} height={"100%"} justifyContent={"flex-end"} padding={"30px 30px"}>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                {startBreadcrumbs.map(breadcrumbs => {
                    return <MUILink component={Link} underline="hover" color="inherit" href={breadcrumbs.href}>
                        {breadcrumbs.title}
                    </MUILink>

                })}
                <MUILink component={Link} underline="hover" color="inherit" href={currantRouteLocation}>
                    {title}
                </MUILink>
            </Breadcrumbs>
            <Stack display={"flex"} flexDirection={"column"} gap={1} overflow={"auto"} height={"100%"}>
                {children}
            </Stack>
            <Stack direction={"row"} gap={2} justifyContent={"flex-end"} alignItems={"flex-end"}>
                {isEdit && onDelete && <Button
                    onClick={onDelete}
                    disabled={false}
                    variant="contained"
                    autoFocus
                    type="submit"
                    size="small"
                    color="error">Delete</Button>}
                <Button
                    onClick={onSave}
                    disabled={false}
                    size="medium"
                    variant="contained">Save</Button>
            </Stack>
        </Stack>
    </>;
});
