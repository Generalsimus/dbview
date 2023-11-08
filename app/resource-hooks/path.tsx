import { FindManyPath } from "@/types/models/request-types"
import { useMemo, useRef } from "react"



// const useResource = <O extends any[], Ret extends any>(callBack: () => Ret, ...args: O): Ret => {
//     const refArgsCache = useRef(args).current;
//     const refValueCache = useRef<Ret | undefined>()


//     return useMemo(() => {
//         const isChanged = isPrimaryObjectDeepEqual(args, refArgsCache);

//         if (isChanged || refValueCache.current == undefined) {
//             return refValueCache.current = callBack()
//         } else {
//             return refValueCache.current
//         }

//     }, [...args])


// }
// const isPrimaryObjectDeepEqual = (primObj1: any, obj2: any): boolean => {
//     if (primObj1 === obj2) {
//         return true;
//     }
//     if (typeof primObj1 !== "object" || typeof obj2 !== "object") {
//         return false;
//     }
//     for (const prop in primObj1) {
//         if (primObj1[prop] != obj2[prop]) {
//             return false;
//         }
//         return isPrimaryObjectDeepEqual(primObj1[prop], obj2[prop])
//     }
//     return true;
// }

// export const useManyPath = async (args: FindManyPath) => {


//     return await useResource(() => {
//         return new PathController().find(args)
//     }, args)
// }
