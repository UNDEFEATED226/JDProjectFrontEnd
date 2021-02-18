import React from 'react'
import RoleService from '../Service/RoleService'

class RoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            roles:[]
        }
        this.addRole=this.addRole.bind(this);
        this.viewRole=this.viewRole.bind(this);
        this.editRole=this.editRole.bind(this);
        this.deleteRole=this.deleteRole.bind(this);
    }
    
    componentDidMount(){
        RoleService.findAllRole().then((response) => {
            this.setState({roles:response.data})
        });
    }

    addRole(){
        this.props.history.push("/addrole");
    }

    viewRole(id){
        this.props.history.push(`/viewrole/${id}`);
    }

    editRole(id){
        this.props.history.push(`/editrole/${id}`);
    }

    deleteRole(id){
        RoleService.deleteRole(id).then(res => {
            this.setState({roles:this.state.roles.filter(roles => roles.id!==id)});
        })
    }

    render(){
       return(
        <div>
        <br></br>
        <h1 className="text-center font-weight-bold text-secondary">角色列表</h1>
        <button className="btn btn-primary btn-lg text-white font-weight-bold" onClick={this.addRole}>添加角色</button>
        <table className="table table-striped table-boarder"> 
           <thead className="text-justify">
                <tr>
                 <th  className="text-secondary">id</th>
                  <th  className="text-secondary">角色名称</th>  
                  <th  className="text-secondary">角色类型</th>  
                  <th  className="text-secondary">创建时间</th> 
                  <th  className="text-secondary">更新时间</th>  
                  <th  className="text-secondary">操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.roles.map(
                         role =>
                         <tr key= {role.id}>         
                             <td>{role.id}</td>
                             <td>{role.rolename}</td>
                             <td>{role.roletype}</td>
                             <td>{role.createtime}</td>
                             <td>{role.updatetime}</td>
                             <td>
                                <button className="btn btn-info font-weight-bold" onClick={() => this.viewRole(role.id)}>查看详情</button>
                                <button className="btn btn-success font-weight-bold" onClick={() => this.editRole(role.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                <button className="btn btn-danger font-weight-bold" onClick={() => this.deleteRole(role.id)} style={{marginLeft:"10px"}}>删除</button>
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

export default RoleComponent 