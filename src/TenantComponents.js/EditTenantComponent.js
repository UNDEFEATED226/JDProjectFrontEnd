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
        this.cancel=this.cancel.bind(this);
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
        if(this.state.name.trim()===''){
            this.setState({nameformat:'租户名称不能为空...'});
            throw new Error('INPUT ERRO');
        }
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
        this.props.history.goBack();
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%",fontSize:"12px",fontFamily:"sans-serif",color:"#666669"}}>
                <div className="card bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center">编辑租户资料</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label>*租户名称:</label>
                        <input placeholder="请输入租户名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.name} onChange={this.changeNameHandler}/>    
                        <div style={{color:"#f44e3b"}}>{this.state.nameformat}</div>     
                    </div>
                    <div className="form-group">
                        <label>业务归属:</label>
                        <input placeholder="请输入业务归属..." style={{fontSize:"12px"}} className="form-control" value={this.state.businessassignment} onChange={this.changeBusinessassignmentHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.businessassignmentformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>租户管理员用户:</label>
                        <select className="text-secondary form-control" style={{fontSize:"12px"}} value={this.state.adminuserid} onChange={this.changeAdminuseridHandler}>
                            <option value=''>请选择租户管理员用户...</option>
                            {
                                this.state.users.map(
                                    u =>
                                    <option value={u.id}>{u.loginname}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm btn-outline-success" onClick={this.editTenant}>保存</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={this.cancel} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditTenantComponent