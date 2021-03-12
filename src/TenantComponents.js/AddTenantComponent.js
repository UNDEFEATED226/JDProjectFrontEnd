import React from 'react'
import TenantService from '../Service/TenantService'
import UserService from '../Service/UserService';

class AddTenantComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
           name:'',
           nameformat:'',
           adminuserid:'',
           users:[]
        }
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.cancel=this.cancel.bind(this);
        this.changeAdminuseridHandler=this.changeAdminuseridHandler.bind(this);
        this.saveTenant=this.saveTenant.bind(this);
    }

    componentDidMount(){
        UserService.findAllUser().then(res=>{
            this.setState({users:res.data});
        });
    }

    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }
    changeAdminuseridHandler=(event)=>{
        this.setState({adminuserid:event.target.value});
    }

    saveTenant=(t)=>{
        t.preventDefault();
        this.setState({nameformat:''});
        if(this.state.name.trim() === ''){
            this.setState({nameformat:'租户名称不能为空...'});
            throw new Error('INPUT ERROR');
        }
        let tenant= {id:'',name:this.state.name,businessassignment:'',isdeleted:0,createtime:'',updatetime:'',adminuserid:this.state.adminuserid};
        TenantService.addTenant(tenant).then(res =>{
            this.props.history.push("/tenantlist");
        }).catch(err =>{
            if(this.state.name.length>255){
                this.setState({nameformat:"租户名称过长..."});
            }
        })
    }

    cancel(){
        this.props.history.goBack();
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%",fontSize:"12px",color:"#666669",fontFamily:"sans-serif"}}>
                <div className="card bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center">添加租户</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label>*租户名称:</label>
                        <input placeholder="请输入租户名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.name} onChange={this.changeNameHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.nameformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>租户管理员用户:</label>
                        <select className="text-secondary form-control" value={this.state.adminuserid} style={{fontSize:"12px"}} onChange={this.changeAdminuseridHandler}>
                            <option defaultValue value=''>请选择租户管理员用户...</option>
                            {
                                this.state.users.map(
                                    u =>
                                    <option value={u.id}>{u.loginname}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm btn-outline-success" onClick={this.saveTenant}>保存</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={this.cancel} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddTenantComponent