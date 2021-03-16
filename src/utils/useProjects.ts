import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useAsync } from 'utils/useAsync'
import { useHttp } from "./http";

export const useProjects = (param?:Partial<Project>) => {
    const { run, ...result } = useAsync<Project[]>()
    const client = useHttp()
    const fetchProjects = () => client('projects', { data: cleanObject(param || {}) })

    useEffect(() => {
        run(fetchProjects(), {
            retry:fetchProjects
        })
    }, [param])// eslint-disable-line react-hooks/exhaustive-deps
    
    return result
}

export const useEditProject = () => {
    const clint = useHttp()
    const {run,...asyncResult} = useAsync()
    const mutate = (params: Partial<Project>) => {
        return run(clint(`projects/${params.id}`, {
            data: params,
            method:'PATCH'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const clint = useHttp()
    const { run, ...asyncResult } = useAsync()
    const mutate = (params: Partial<Project>) => {
        return run(clint(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}