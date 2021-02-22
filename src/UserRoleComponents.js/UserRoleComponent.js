import React from 'react'
import moment from 'moment'
import UserRoleService from '../Service/UserRoleService';

class UserRoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userroles:[]
        }
        this.deleteUserRole=this.deleteUserRole.bind(this);
        this.addUserRole=this.addUserRole.bind(this);
    }
    
    componentDidMount(){
        UserRoleService.findAllUserRole().then((response) => {
            this.setState({userroles:response.data})
        });
    }

    addUserRole(){
        this.props.history.push("/adduserrole");
    }

    deleteUserRole(id){
        UserRoleService.deleteUserRole(id).then(res => {
            this.setState({userroles:this.state.userroles.filter(ur => ur.id!==id)});
        })
    }

    render(){
       return(
        <div>
        <br></br>
        <h1 className="text-center font-weight-bold text-secondary">用户角色列表</h1>
        <button className="btn btn-primary btn-lg text-white font-weight-bold" onClick={this.addUserRole}>添加用户角色</button>
        <table className="table table-boarder"> 
           <thead className="text-justify">
                <tr>
                 <th  className="text-secondary">id</th>
                  <th  className="text-secondary">用户ID</th>  
                  <th  className="text-secondary">角色ID</th>  
                  <th  className="text-secondary">创建时间</th> 
                  <th  className="text-secondary">更新时间</th>  
                  <th  className="text-secondary">操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.userroles.map(
                        userrole =>
                         <tr key= {userrole.id}>         
                             <td>{userrole.id}</td>
                             <td>{userrole.userid}</td>
                             <td>{userrole.roleid}</td>
                             <td>{moment(userrole.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td>{moment(userrole.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td>
                                <button className="btn btn-danger font-weight-bold" onClick={() => this.deleteUserRole(userrole.id)} style={{marginLeft:"10px"}}>删除</button>
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

export default UserRoleComponent 