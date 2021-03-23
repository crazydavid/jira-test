import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { useUrlQueryParam } from "utils/url"
import { useProject } from "utils/useProjects"

export const useProjectsSearchParams = () => {
    const [params, setParams] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({ ...params, personId: Number(params.personId) || undefined }),[params]),
        setParams
    ] as const
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
    const [_, setUrlParams] = useSearchParams()
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId))
    
    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' })
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })
    
    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}