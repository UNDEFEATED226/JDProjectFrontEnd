import React from 'react'
import AuthService from '../Service/AuthService';
import RoleAuthService from '../Service/RoleAuthService'
import RoleService from '../Service/RoleService';

class EditRoleAuthComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            roleid:'',
            authid:'',
            isdeleted:'',
            createtime:'',
            roles:[],
            auths:[]
        }
        this.changeRoleidHandler=this.changeRoleidHandler.bind(this);
        this.changeAuthidHandler=this.changeAuthidHandler.bind(this);
        this.editRoleAuth=this.editRoleAuth.bind(this);
    }
    
    componentDidMount(){
        RoleAuthService.findById(this.state.id).then(res => {
           let roleauth=res.data;
           this.setState({
               roleid:roleauth.roleid,
               authid:roleauth.authid,
               isdeleted:roleauth.isdeleted,
               createtime:roleauth.createtime
           });
        });
        RoleService.findAllRole().then(res=>{
            this.setState({roles:res.data});
        });
        AuthService.findAllAuthOrderbyresid().then(res=>{
            this.setState({auths:res.data});
        })
    }

    changeRoleidHandler=(event)=>{
        this.setState({roleid:event.target.value});
    }
    changeAuthidHandler=(event)=>{
        this.setState({authid:event.target.value});
    }

    editRoleAuth=(r)=>{
        r.preventDefault();
        let roleauth= {id:this.state.id,roleid:this.state.roleid,authid:this.state.authid,
            createtime:this.state.createtime,isdeleted:this.state.isdeleted,updatetime:''};
        RoleAuthService.editRoleAuth(this.state.id,roleauth).then(res =>{
            this.props.history.push("/roleauthlist");
        });
    }

    cancel(){
        this.props.history.push('/roleauthlist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card f-size bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center font-weight-bold text-secondary">编辑角色权限资料</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">角色ID:</label>
                        <select className="form-control" style={{fontSize:"12px"}} onChange={this.changeRoleidHandler}>
                            <option defaultValue value={this.state.roleid}>请选择角色</option>
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
                                    <option value={auth.id}>权限名称:{auth.authname}, 资源名称:{auth.resname}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm green-btn font-weight-bold text-white" onClick={this.editRoleAuth}>保存</button>
                    <button className="btn btn-sm red-btn font-weight-bold text-white" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditRoleAuthComponent