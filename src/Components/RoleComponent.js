import React from 'react'
import RoleService from '../Service/RoleService'

class UserComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            roles:[]
        }
    }
    
    componentDidMount(){
        RoleService.findAllRole().then((response) => {
            this.setState({roles:response.data})
        });
    }

    render(){
       return(
            <div>
                <h1 className="text-center">配置详情</h1>
                <table className="table table-boarder">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>user id</th>
                        <th>role id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.roles.map(
                                role =>
                                <tr key= {role.id}>         
                                    <td>{role.id}</td>
                                    <td>{role.userid}</td>
                                    <td>{role.roleid}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
       )
    }
}

export default UserComponent 