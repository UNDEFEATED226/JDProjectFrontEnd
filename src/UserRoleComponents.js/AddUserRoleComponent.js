import React from 'react'
import UserRoleService from '../Service/UserRoleService';
import RoleService from '../Service/RoleService'
import UserService from '../Service/UserService';

class AddUserRoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            users:[],
            roles:[],
            userid:'',
            useridformat:'',
            roleid:'',
            roleidformat:''
        }
        this.changeUseridHandler=this.changeUseridHandler.bind(this);
        this.changeRoleidHandler=this.changeRoleidHandler.bind(this);
        this.saveUserRole=this.saveUserRole.bind(this);
    }

    componentDidMount(){
        UserService.findAllUser().then(res => {
            this.setState({users:res.data});
        });
        RoleService.findAllRole().then(res =>{
            this.setState({roles:res.data});
        });
    }

    changeUseridHandler=(event) =>{
        this.setState({userid:event.target.value});
    }
    changeRoleidHandler=(event) =>{
        this.setState({roleid:event.target.value});
    }

    saveUserRole=(u)=>{
        u.preventDefault();
        var bool = false;
        this.setState({
            useridformat:'',
            roleidformat:'',
        });
        if(this.state.userid === ''){
            this.setState({
                useridformat:"请选择用户...",
            });
            bool=true
        }
        if(this.state.roleid === ''){
            this.setState({
                roleidformat:"请选择角色...",
            });
            bool=true
        }
        if(bool){
            throw new Error("FORMAT ERROR");
        }
        let userrole= {id:'',userid:this.state.userid,roleid:this.state.roleid,isdeleted:0,
        createtime:'',updatetime:''};
        UserRoleService.addUserRole(userrole).then(res =>{
            this.props.history.push("/userrolelist");
        });
    }

    cancel(){
        this.props.history.push('/userrolelist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card f-size bg-light mx-auto" style={{width:"25rem"}}>
                 <h5 className="card-header text-center font-weight-bold text-secondary">添加用户角色</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">用户:</label>
                        <select className="form-control" style={{fontSize:"12px"}} value={this.state.userid} onChange={this.changeUseridHandler}>
                            <option defaultValue value=''>请选择用户</option>
                            {
                                this.state.users.map(
                                    user=>
                                    <option value={user.id}>{user.loginname}</option>
                                )
                            }
                        </select>
                        <div style={{color:"#f44e3b"}}>{this.state.useridformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">角色:</label>
                        <select className="form-control" style={{fontSize:"12px"}} value={this.state.roleid} onChange={this.changeRoleidHandler}>
                            <option defaultValue value=''>请选择角色</option>
                            {
                                this.state.roles.map(
                                    role=>
                                    <option value={role.id}>{role.rolename}</option>
                                )
                            }
                        </select>
                        <div style={{color:"#f44e3b"}}>{this.state.roleidformat}</div>    
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm green-btn font-weight-bold text-white" onClick={this.saveUserRole}>保存</button>
                    <button className="btn btn-sm red-btn font-weight-bold text-white" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddUserRoleComponent