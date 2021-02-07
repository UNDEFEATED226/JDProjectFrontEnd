import React from 'react'
import TenantService from '../Service/TenantService'

class EditTenantComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            name:'',
            nameformat:'',
            businessassignment:'',
            businessassignmentformat:'',
            isdeleted:'',
            createtime:'',
            adminuserid:'',
            adminuseridformat:''
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
        this.setState({nameformat:''});
        this.setState({businessassignmentformat:''});
        this.setState({adminuseridformat:''});
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
            if(this.state.adminuserid!=null && (isNaN(this.state.adminuserid)||this.state.adminuserid.length>11)){
                this.setState({adminuseridformat:" 租户管理员用户ID为至多11位纯数字..."});
            }
        })
    }

    cancel(){
        this.props.history.push('/tenantlist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                 <h3 className="card-header text-center font-weight-bold text-secondary">编辑租户资料</h3>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">租户名称:</label>
                        <input placeholder="请输入租户名称..." className="form-control" value={this.state.name} onChange={this.changeNameHandler}/>    
                        <div style={{color:"#f44e3b"}}>{this.state.nameformat}</div>     
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">业务归属:</label>
                        <input placeholder="请输入业务归属..." className="form-control" value={this.state.businessassignment} onChange={this.changeBusinessassignmentHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.businessassignmentformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">租户管理员用户ID:</label>
                        <input placeholder="请输入租户管理员用户ID..." className="form-control" value={this.state.adminuserid} onChange={this.changeAdminuseridHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.adminuseridformat}</div>    
                    </div>
                    <button className="btn btn-success" onClick={this.editTenant}>保存</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditTenantComponent