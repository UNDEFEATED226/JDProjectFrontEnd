import React from 'react'
import RoleService from '../Service/RoleService'

class AddRoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            rolename:'',
            rolenameformat:'',
            roletype:'',
            roletypeformat:''
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
        this.setState({roletypeformat:''});
        var bool = false;
        if(this.state.roletype===''){
            bool = true;
            this.setState({roletypeformat:'请选择角色类型...'});
        }
        if(this.state.rolename.trim()===''){
            bool = true;
            this.setState({rolenameformat:"角色名称不能为空..."});
        }
        if(bool){
            throw new Error("INPUT ERROR");
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
        this.props.history.goBack();
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%",color:"#666669",fontSize:"12px",fontFamily:"Sans-Serif"}}>
                <div className="card bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center">添加角色</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label>*角色名称:</label>
                        <input placeholder="请输入角色名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.rolename} onChange={this.changeRolenameHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.rolenameformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>*角色类型:</label>
                        <select className="form-control" style={{fontSize:"12px",color:"#666669"}} value={this.state.roletype} onChange={this.changeRoletypeHandler}>
                            <option defaultValue value=''>请选择角色类型...</option>
                            <option value='1'>组织角色</option>
                            <option value='2'>业务角色</option>
                        </select>
                        <div style={{color:"#f44e3b"}}>{this.state.roletypeformat}</div>    
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm btn-outline-success" onClick={this.saveRole}>保存</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddRoleComponent