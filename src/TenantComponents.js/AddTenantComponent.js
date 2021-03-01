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
        this.props.history.push('/tenantlist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card f-size bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center font-weight-bold text-secondary">添加租户</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">租户名称:</label>
                        <input placeholder="请输入租户名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.name} onChange={this.changeNameHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.nameformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">租户管理员用户:</label>
                        <select className="form-control" value={this.state.adminuserid} style={{fontSize:"12px"}} onChange={this.changeAdminuseridHandler}>
                            <option defaultValue value=''>请选择租户管理员用户</option>
                            {
                                this.state.users.map(
                                    u =>
                                    <option value={u.id}>{u.realname}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm green-btn font-weight-bold text-white" onClick={this.saveTenant}>保存</button>
                    <button className="btn btn-sm red-btn font-weight-bold text-white" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddTenantComponent