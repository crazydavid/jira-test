import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from "utils"
import {Row} from 'components/lib'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/useProjects'
import { useUsers } from 'utils/useUsers'
import styled from "@emotion/styled";
import { useProjectsSearchParams } from './util'

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
    const [params,setParams] = useProjectsSearchParams()
    const debouncedParam = useDebounce(params,200)
    const { isLoading, error, data: list, retry } = useProjects(debouncedParam)
    const { data: users } = useUsers()
    useDocumentTitle('项目列表',false)
    return <Container>
        <Row marginBottom={2} between={true}>
            <Typography.Title>项目列表</Typography.Title>
            {props.projectButton}
        </Row>
        <SearchPanel users={users || []} params={params} setParams={setParams} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
        <List projectButton={props.projectButton} refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;