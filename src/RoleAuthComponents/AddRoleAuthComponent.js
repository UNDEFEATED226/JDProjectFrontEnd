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
        AuthService.findAllAuth().then(res=>{
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
                <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                 <h3 className="card-header text-center font-weight-bold text-secondary">添加角色权限</h3>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">角色:</label>
                        <select className="form-control" value={this.state.roleid} onChange={this.changeRoleidHandler}>
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
                        <select className="form-control selectpicker" data-live-search="true" value={this.state.authid} onChange={this.changeAuthidHandler}>
                            <option defaultValue value=''>请选择权限</option>
                            {
                                this.state.auths.map(
                                    auth =>
                                    <option value={auth.id}>{auth.authname}</option>
                                )
                            }
                        </select>
                    </div>
                    <button className="btn btn-success" onClick={this.saveRoleAuth}>保存</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddRoleAuthComponent