import { Form, Input } from "antd"
import { UserSelect } from "components/user-select"
import { Project } from "types/project"

export interface User{
    id: number
    name: string
    email: string
    title: string
    organization: string
    token:string
}

interface SearchPanelProps {
    users: User[]
    params:Partial<Pick<Project,'name'|'personId'>>
    setParams: (params: SearchPanelProps['params'])=>void
}

export const SearchPanel = ({ users, params, setParams }: SearchPanelProps) => {

    return (
        <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
            <Form.Item>
                <Input
                    placeholder={"项目名"}
                    type="text"
                    value={params.name}
                    onChange={evt => setParams({
                        ...params,
                        name:evt.target.value
                    })}
                />
            </Form.Item>
            <Form.Item>
                <UserSelect
                    defaultOptionName={"负责人"}
                    value={params.personId}
                    onChange={value => setParams({
                        ...params,
                        personId: value
                    })}
                />
            </Form.Item>
        </Form>
    )
}