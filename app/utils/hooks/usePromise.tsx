import { useEffect, useState } from "react"




export const usePromise = <Prom extends Promise<any>>(promise: Prom, catchErr?: Prom["catch"], finallyPromise?: Prom["finally"]) => {
    const [value, setValue] = useState<Awaited<Prom> | undefined>();
    useEffect(() => {
        let isAlreadyEjected = false;
        if (value !== undefined) {
            setValue(undefined)
        }
        promise.then((res: Awaited<Prom>) => {
            if (!isAlreadyEjected) {
                setValue(res);
            }
        }).catch(catchErr).finally(finallyPromise);
        return () => {
            isAlreadyEjected = true;
        }
    }, [promise])
    return value
}