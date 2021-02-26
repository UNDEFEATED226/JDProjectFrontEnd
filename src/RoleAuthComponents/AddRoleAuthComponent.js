import React from 'react'
import AuthService from '../Service/AuthService'
import RoleAuthService from '../Service/RoleAuthService'
import RoleService from '../Service/RoleService'

class AddRoleAuthComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            roleid:'',
            authid:'',
            authidformat:'',
            roles:[],
            auths:[]
        }
        this.changeAuthidHandler=this.changeAuthidHandler.bind(this);
        this.changeRoleidHandler=this.changeRoleidHandler.bind(this);
        this.saveRoleAuth=this.saveRoleAuth.bind(this);
    }

    componentDidMount(){
        RoleService.findAllRole().then(res=>{
            this.setState({roles:res.data});
        });
        AuthService.findAllAuthOrderbyresid().then(res=>{
            this.setState({auths:res.data});
        });
    }

    changeRoleidHandler=(event) =>{
        this.setState({roleid:event.target.value});
    }

    changeAuthidHandler=(event) =>{
        this.setState({authid:event.target.value});
    }

    saveRoleAuth=(r)=>{
        r.preventDefault();
        this.setState({
            authidformat:''
        });
        let roleauth= {id:'',roleid:this.state.roleid,authid:this.state.authid,isdeleted:0,createtime:'',updatetime:''};
        RoleAuthService.addRoleAuth(roleauth).then(res =>{
            this.props.history.push("/roleauthlist");
        }).catch(err =>{
            if(isNaN(this.state.authid) || this.state.authid.length>11){
                this.setState({authidformat:"角色id为至多11位的纯数字..."});
            }
        });
    }

    cancel(){
        this.props.history.push('/roleauthlist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card f-size bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center font-weight-bold text-secondary">添加角色权限</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">角色:</label>
                        <select className="form-control" style={{fontSize:"12px"}} value={this.state.roleid} onChange={this.changeRoleidHandler}>
                            <option defaultValue value=''>请选择角色</option>
                            {
                                this.state.roles.map(
                                    role =>
                                    <option value={role.id}>{role.rolename}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">权限:</label>
                        <select className="form-control" style={{fontSize:"12px"}} value={this.state.authid} onChange={this.changeAuthidHandler}>
                            <option defaultValue value=''>请选择权限</option>
                            {
                                this.state.auths.map(
                                    auth =>
                                    <option value={auth.id}>{auth.authname},{auth.resname}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm green-btn font-weight-bold text-white" onClick={this.saveRoleAuth}>保存</button>
                    <button className="btn btn-sm red-btn font-weight-bold text-white" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddRoleAuthComponent