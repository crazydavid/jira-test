import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from "utils"
import {ButtonNoPadding, Row} from 'components/lib'
import {  Typography } from 'antd'
import { useProjects } from 'utils/useProjects'
import { useUsers } from 'utils/useUsers'
import styled from "@emotion/styled";
import { useProjectModal, useProjectsSearchParams } from './util'

export const ProjectListScreen = () => {
    const { open } = useProjectModal()
    const [params,setParams] = useProjectsSearchParams()
    const debouncedParam = useDebounce(params,200)
    const { isLoading, error, data: list, retry } = useProjects(debouncedParam)
    const { data: users } = useUsers()
    useDocumentTitle('项目列表',false)
    return <Container>
        <Row marginBottom={2} between={true}>
            <Typography.Title>项目列表</Typography.Title>
            <ButtonNoPadding onClick={open} type={'link'} >
                创建项目
            </ButtonNoPadding>
        </Row>
        <SearchPanel users={users || []} params={params} setParams={setParams} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
        <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;