import React from 'react'
import RoleAuthService from '../Service/RoleAuthService'
import RoleService from '../Service/RoleService';

class EditRoleAuthComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            roleid:'',
            authid:'',
            authidformat:'',
            isdeleted:'',
            createtime:'',
            roles:[]
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
        this.setState({
            authidformat:''
        });
        let roleauth= {id:this.state.id,roleid:this.state.roleid,authid:this.state.authid,
            createtime:this.state.createtime,isdeleted:this.state.isdeleted,updatetime:''};
        RoleAuthService.editRoleAuth(this.state.id,roleauth).then(res =>{
            this.props.history.push("/roleauthlist");
        }).catch(err => {
            if(this.state.authid!=null && (isNaN(this.state.authid)||this.state.authid.length>11)){
                this.setState({authidformat:" 权限ID为至多11位纯数字..."});
            }
        })
    }

    cancel(){
        this.props.history.push('/roleauthlist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                 <h3 className="card-header text-center font-weight-bold text-secondary">编辑角色权限资料</h3>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">角色ID:</label>
                        <select className="form-control" onChange={this.changeRoleidHandler}>
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
                        <label className="text-secondary font-weight-bold">权限ID:</label>
                        <input placeholder="请输入权限ID..." className="form-control" value={this.state.authid} onChange={this.changeAuthidHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.authidformat}</div>   
                    </div>
                    <button className="btn btn-success" onClick={this.editRoleAuth}>保存</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditRoleAuthComponent