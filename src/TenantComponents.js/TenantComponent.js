import React from 'react'
import moment from 'moment'
import TenantService from "../Service/TenantService"

class TenantComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tenants:[]
        }
        this.addTenant=this.addTenant.bind(this);
        this.editTenant=this.editTenant.bind(this);
    }

    componentDidMount(){
        TenantService.findAllTenant().then(res=>{
            this.setState({tenants:res.data});
        })
    }

    addTenant(){
        this.props.history.push("/addtenant");
    }

    editTenant(id){
        this.props.history.push(`/edittenant/${id}`);
    }

    deleteTenant(id){
        TenantService.deleteTenant(id).then(res=>{
            this.setState({tenants:this.state.tenants.filter(tenant => tenant.id!==id)});
        })
    }

    render(){
        return(
            <div>
            <br></br>
            <h1 className="text-center font-weight-bold text-secondary">租户列表</h1>
            <button className="btn btn-primary btn-lg text-white font-weight-bold" onClick={this.addTenant}>添加租户</button>
            <table className="table table-boarder"> 
               <thead className="text-justify">
                    <tr>
                     <th  className="text-secondary">id</th>
                      <th  className="text-secondary">租户名称</th>  
                      <th  className="text-secondary">业务归属</th>  
                      <th  className="text-secondary">创建时间</th> 
                      <th  className="text-secondary">最后一次更新时间</th>  
                      <th  className="text-secondary">租户管理员用户ID</th>  
                      <th  className="text-secondary">操作</th>
                    </tr>
                    </thead>
                 <tbody>
                     {
                         this.state.tenants.map(
                             tenant =>
                             <tr key= {tenant.id}>         
                                 <td>{tenant.id}</td>
                                 <td>{tenant.name}</td>
                                 <td>{tenant.businessassignment}</td>
                                 <td>{moment(tenant.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                                 <td>{moment(tenant.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                                 <td>{tenant.adminuserid}</td>
                                 <td>
                                    <button className="btn btn-success font-weight-bold" onClick={() => this.editTenant(tenant.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                    <button className="btn btn-danger font-weight-bold" onClick={() => this.deleteTenant(tenant.id)} style={{marginLeft:"10px"}}>删除</button>
                                 </td>
                             </tr>
                         )  
                     }
                 </tbody>
            </table>
        </div>
        )
    }
}

export default TenantComponent