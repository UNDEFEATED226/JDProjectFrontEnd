import React from 'react'
import RoleService from '../Service/RoleService'

class AddRoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            rolename:'',
            rolenameformat:'',
            roletype:''
        }
        this.changeRolenameHandler=this.changeRolenameHandler.bind(this);
        this.changeRoletypeHandler=this.changeRoletypeHandler.bind(this);
        this.saveRole=this.saveRole.bind(this);
    }

    changeRolenameHandler=(event) =>{
        this.setState({rolename:event.target.value});
    }
    changeRoletypeHandler=(event) =>{
        this.setState({roletype:event.target.value});
    }

    saveRole=(r)=>{
        r.preventDefault();
        this.setState({rolenameformat:''});
        if(this.state.rolename===''){
            this.setState({rolenameformat:"角色名称不能为空..."});
            throw new Error("Name is empty");
        }
        let role= {id:'',rolename:this.state.rolename,roletype:this.state.roletype,description:'',
        tenantid:'',isdeleted:0,issystem:'',createtime:'',updatetime:'',rolecode:'',isforbidden:0,isdefault:0};
        RoleService.addRole(role).then(res =>{
            this.props.history.push("/rolelist");
        }).catch(err =>{
            if(this.state.rolename.length>64){
                this.setState({rolenameformat:"角色名称过长..."});
            }
        });
    }

    cancel(){
        this.props.history.push('/rolelist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                 <h3 className="card-header text-center font-weight-bold text-secondary">添加角色</h3>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">角色名称:</label>
                        <input placeholder="请输入角色名称..." className="form-control" value={this.state.rolename} onChange={this.changeRolenameHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.rolenameformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">角色类型:</label>
                        <select className="form-control" value={this.state.roletype} onChange={this.changeRoletypeHandler}>
                            <option defaultValue value=''>请选择角色类型</option>
                            <option value='1'>组织角色</option>
                            <option value='2'>业务角色</option>
                        </select>
                    </div>
                    <button className="btn btn-success" onClick={this.saveRole}>保存</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddRoleComponent