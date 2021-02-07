import React from 'react'
import UserService from '../Service/UserService'

class UserComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
        this.addUser=this.addUser.bind(this);
        this.viewUser=this.viewUser.bind(this);
        this.editUser=this.editUser.bind(this);
        this.deleteUser=this.deleteUser.bind(this);
    }
    
    componentDidMount(){
        UserService.findAllUser().then((response) => {
            this.setState({users:response.data})
        });
    }

    addUser(){
        this.props.history.push("/adduser");
    }

    viewUser(id){
        this.props.history.push(`/viewuser/${id}`);
    }
    editUser(id){
        this.props.history.push(`/edituser/${id}`);
    }

    deleteUser(id){
        UserService.deleteUser(id).then(res =>{
            this.setState({users:this.state.users.filter(user => user.id!==id)});
        })
    }

    render(){
       return(
        <div>
        <br></br>
        <h1 className="text-center font-weight-bold text-secondary">用户列表</h1>
        <button className="btn btn-secondary btn-lg text-white font-weight-bold" onClick={this.addUser}>添加用户</button>
        <table className="table table-striped table-boarder"> 
           <thead className="text-justify">
                <tr>
                 <th  className="text-secondary">id</th>
                  <th  className="text-secondary">登录用户名</th>  
                  <th  className="text-secondary">名字</th>  
                  <th  className="text-secondary">组织名称</th> 
                  <th  className="text-secondary">邮箱</th>  
                  <th  className="text-secondary">手机号</th> 
                  <th  className="text-secondary">操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.users.map(
                         user =>
                         <tr key= {user.id}>         
                             <td>{user.id}</td>
                             <td>{user.loginname}</td>
                             <td>{user.realname}</td>
                             <td>{user.orgid}</td>
                             <td>{user.email}</td>
                             <td>{user.mobile}</td>
                             <td>
                                <button className="btn btn-secondary font-weight-bold" onClick={() => this.viewUser(user.id)}>查看详情</button>
                                <button className="btn btn-secondary font-weight-bold" onClick={() => this.editUser(user.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                <button className="btn btn-danger font-weight-bold" onClick={() => this.deleteUser(user.id)} style={{marginLeft:"10px"}}>删除</button>
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

export default UserComponent 