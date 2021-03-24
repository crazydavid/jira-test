import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ""

export const cleanObject = (object:{[key:string]:unknown}) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback:()=>void) => {
    useEffect(() => {
        callback()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
}

export const useDebounce = <V>(value:V, delay?:number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debounceValue
}

export const useArray = <T>(persons: T[]) => {
    const [value, setValue] = useState(persons)
    const clear = ():void => {
        setValue([])
    }
    const removeIndex = (index:number) => {
        const copy = [...value]
        copy.splice(index, 1)
        setValue(copy)
    }
    const add = (item:T) => {
        setValue([...value,item])
    }
    return { value, clear, removeIndex, add }
}

export const useDocumentTitle = (title: string,keepOnUnmount=true) => {
    const oldTitle = useRef(document.title).current

    useEffect(() => {
        document.title = title
    }, [title])
    
    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    },[keepOnUnmount,oldTitle])
}

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj 
 * @param keys 
 * @returns 
 */
export const subset = <
    O extends { [key in string]: unknown },
    K extends keyof O
>(
    obj: O,
    keys:K[]
) => {
    const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K))
    return Object.fromEntries(filteredEntries) as Pick<O,K>
}

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false)
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })
    return mountedRef
}