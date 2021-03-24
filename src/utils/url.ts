import { useMemo, useState } from "react"
import { useSearchParams, URLSearchParamsInit } from "react-router-dom"
import { cleanObject, subset } from "utils"

export const useUrlQueryParam = <K extends string>(keys:K[]) => {
    const [searchParams] = useSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    const [stateKeys] = useState(keys)

    return [
        useMemo(
            ()=>subset(Object.fromEntries(searchParams),stateKeys) as {[Key in K]:string},
            [searchParams, stateKeys]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
            return setSearchParams(params)
        }
    ] as const
}

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    return (params:{[key in string]:unknown}) => {
        const o = cleanObject({
            ...Object.fromEntries(searchParams),
            ...params
        }) as URLSearchParamsInit
        return setSearchParams(o)
    }
}

