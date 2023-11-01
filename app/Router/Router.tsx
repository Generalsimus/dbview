import React, { useState } from "react";
interface Route {
    title: string,
    path: string
}


interface IProps {
    title: string,
    path: string
}
export const Router: React.FC<IProps> = React.memo(({ path }) => {

    return <></>;
});

// interface IProps {
//     title: string,
//     path: string
// }
// export const Router: React.FC<IProps> = React.memo(({ path }) => {

//     return <></>;
// });
