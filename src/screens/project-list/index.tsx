import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from "utils"
import {ButtonNoPadding, ErrorBox, Row} from 'components/lib'
import {  Typography } from 'antd'
import { useProjects } from 'utils/useProjects'
import { useUsers } from 'utils/useUsers'
import styled from "@emotion/styled";
import { useProjectModal, useProjectsSearchParams } from './util'

export const ProjectListScreen = () => {
    const { open } = useProjectModal()
    const [params,setParams] = useProjectsSearchParams()
    const { isLoading, error, data: list } = useProjects(useDebounce(params, 200))
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
        <ErrorBox error={error}/>
        <List loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;