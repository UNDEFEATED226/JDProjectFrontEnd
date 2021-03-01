import React from 'react'
import TenantService from '../Service/TenantService'
import UserService from '../Service/UserService';

class EditTenantComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            users:[],
            name:'',
            nameformat:'',
            businessassignment:'',
            businessassignmentformat:'',
            isdeleted:'',
            createtime:'',
            adminuserid:''
        }
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changeBusinessassignmentHandler=this.changeBusinessassignmentHandler.bind(this);
        this.changeAdminuseridHandler=this.changeAdminuseridHandler.bind(this);
        this.editTenant=this.editTenant.bind(this);
    }
    
    componentDidMount(){
        TenantService.findById(this.state.id).then(res => {
           let tenant=res.data;
           this.setState({
                name:tenant.name,
                businessassignment:tenant.businessassignment,
                isdeleted:tenant.isdeleted,
                createtime:tenant.createtime,
                adminuserid:tenant.adminuserid
           });
        });
        UserService.findAllUser().then(res=>{
            this.setState({users:res.data});
        });
    }

    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }
    changeBusinessassignmentHandler=(event)=>{
        this.setState({businessassignment:event.target.value});
    }
    changeAdminuseridHandler=(event)=>{
        this.setState({adminuserid:event.target.value});
    }

    editTenant=(t)=>{
        t.preventDefault();
        this.setState({
            nameformat:'',
            businessassignmentformat:'',
        });
        let tenant= {id:this.state.id,name:this.state.name,businessassignment:this.state.businessassignment,
        isdeleted:this.state.isdeleted,createtime:this.state.createtime,updatetime:'',adminuserid:this.state.adminuserid};
        TenantService.editTenant(this.state.id,tenant).then(res =>{
            this.props.history.push("/tenantlist");
        }).catch(err => {
            if(this.state.name!=null && this.state.name.length>255){
                this.setState({nameformat:"租户名称过长..."});
            }
            if(this.state.businessassignment!=null && this.state.businessassignment.length>255){
                this.setState({businessassignmentformat:"业务归属过长..."});
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
                 <h5 className="card-header text-center font-weight-bold text-secondary">编辑租户资料</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">租户名称:</label>
                        <input placeholder="请输入租户名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.name} onChange={this.changeNameHandler}/>    
                        <div style={{color:"#f44e3b"}}>{this.state.nameformat}</div>     
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">业务归属:</label>
                        <input placeholder="请输入业务归属..." style={{fontSize:"12px"}} className="form-control" value={this.state.businessassignment} onChange={this.changeBusinessassignmentHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.businessassignmentformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">租户管理员用户:</label>
                        <select className="form-control" style={{fontSize:"12px"}} onChange={this.changeAdminuseridHandler}>
                            <option defaultValue value={this.state.adminuserid}>请选择租户管理员用户</option>
                            {
                                this.state.users.map(
                                    u =>
                                    <option value={u.id}>{u.realname}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm green-btn font-weight-bold text-white" onClick={this.editTenant}>保存</button>
                    <button className="btn btn-sm red-btn font-weight-bold text-white" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditTenantComponent