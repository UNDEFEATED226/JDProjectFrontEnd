import React from 'react'
import moment from 'moment'
import RoleAuthService from '../Service/RoleAuthService'

class RoleAuthComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            roleauths:[]
        }
        this.addRoleAuth=this.addRoleAuth.bind(this);
        this.editRoleAuth=this.editRoleAuth.bind(this);
        this.deleteRoleAuth=this.deleteRoleAuth.bind(this);
    }
    
    componentDidMount(){
        RoleAuthService.findAllRoleAuth().then((response) => {
            this.setState({roleauths:response.data})
        });
    }

    addRoleAuth(){
        this.props.history.push("/addroleauth");
    }

    editRoleAuth(id){
        this.props.history.push(`/editroleauth/${id}`);
    }

    deleteRoleAuth(id){
        RoleAuthService.deleteRoleAuth(id).then(res => {
            this.setState({roleauths:this.state.roleauths.filter(r => r.id!==id)});
        })
    }

    render(){
       return(
        <div>
        <br></br>
        <h1 className="text-center font-weight-bold text-secondary">角色权限列表</h1>
        <button className="btn btn-primary btn-lg text-white font-weight-bold" onClick={this.addRoleAuth}>添加角色权限</button>
        <table className="table table-striped table-boarder"> 
           <thead className="text-justify">
                <tr>
                 <th  className="text-secondary">ID</th>
                  <th  className="text-secondary">角色ID</th>  
                  <th  className="text-secondary">权限ID</th>  
                  <th  className="text-secondary">创建时间</th> 
                  <th  className="text-secondary">更新时间</th>  
                  <th  className="text-secondary">操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.roleauths.map(
                         roleauth =>
                         <tr key= {roleauth.id}>         
                             <td>{roleauth.id}</td>
                             <td>{roleauth.roleid}</td>
                             <td>{roleauth.authid}</td>
                             <td>{moment(roleauth.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td>{moment(roleauth.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td>
                                <button className="btn btn-success font-weight-bold" onClick={() => this.editRoleAuth(roleauth.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                <button className="btn btn-danger font-weight-bold" onClick={() => this.deleteRoleAuth(roleauth.id)} style={{marginLeft:"10px"}}>删除</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
    </div>
       )
    }
}

export default RoleAuthComponent 