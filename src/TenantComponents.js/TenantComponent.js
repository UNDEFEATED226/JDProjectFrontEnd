import React from 'react'
import moment from 'moment'
import TenantService from "../Service/TenantService"

class TenantComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pageNo:1,
            tenants:[]
        }
        this.firstPage=this.firstPage.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.addTenant=this.addTenant.bind(this);
        this.editTenant=this.editTenant.bind(this);
        this.findAllTenant=this.findAllTenant.bind(this);
    }

    componentDidMount(){
        this.findAllTenant(this.state.pageNo);
    }

    findAllTenant(p){
        TenantService.findAllTenantPaginated(p).then(res=>{
            this.setState({tenants:res.data.content});
        });
        TenantService.count().then(res=>{
            this.setState({totalElements:res.data});
        });
        TenantService.page().then(res=>{
            this.setState({totalPages:res.data});
        });
        this.setState({pageNo:p});
    }

    firstPage=()=>{
        this.findAllTenant(1);
    }

    lastPage=()=>{
        this.findAllTenant(this.state.totalPages);
    }

    pageUp=()=>{
        this.findAllTenant(this.state.pageNo+1);
    }

    pageDown=()=>{
        this.findAllTenant(this.state.pageNo-1);
    }

    addTenant(){
        this.props.history.push("/addtenant");
    }

    editTenant(id){
        this.props.history.push(`/edittenant/${id}`);
    }

    deleteTenant(id){
        TenantService.deleteTenant(id).then(res=>{
            if(this.state.pageNo === this.state.totalPages && this.state.pageNo>1){
                if(this.state.tenants.length === 1){
                    this.findAllTenant(this.state.pageNo-1);
                }else{
                    this.findAllTenant(this.state.pageNo);
                }
            }else{
                this.findAllTenant(this.state.pageNo);
            }
        });
    }

    render(){
        return(
            <div>
            <br></br>
            <h3 className="text-center font-weight-bold text-secondary">租户列表</h3>
            <button className="btn blue-btn btn-sm text-white font-weight-bold" onClick={this.addTenant}>添加租户</button>
            <table className="table f-size table-boarder" style={{color:"grey"}}> 
               <thead className="text-justify">
                    <tr>
                      <th style={{columnWidth:"30px"}}>id</th>
                      <th style={{columnWidth:"200px"}}>租户名称</th>  
                      <th style={{columnWidth:"140px"}}>业务归属</th>  
                      <th style={{columnWidth:"170px"}}>租户管理员用户名字</th>  
                      <th style={{columnWidth:"190px"}}>创建时间</th> 
                      <th style={{columnWidth:"190px"}}>最后一次更新时间</th>  
                      <th className="text-center" style={{columnWidth:"300px"}}>操作</th>
                    </tr>
                    </thead>
                 <tbody>
                     {
                         this.state.tenants.map(
                             tenant =>
                             <tr key= {tenant.id}>         
                                 <td className="t-cell" style={{maxWidth:"30px"}} data-toggle='tooltip' title={tenant.id}>{tenant.id}</td>
                                 <td className="t-cell" style={{maxWidth:"200px"}} data-toggle='tooltip' title={tenant.name}>{tenant.name}</td>
                                 <td className="t-cell" style={{maxWidth:"140px"}} data-toggle='tooltip' title={tenant.businessassignment}>{tenant.businessassignment}</td>
                                 <td className="t-cell" style={{maxWidth:"170px",color:tenant.adminname ==='租户管理员用户不存在或已删除' ? 'red':undefined}} data-toggle='tooltip' title={tenant.adminname}>{tenant.adminname}</td>
                                 <td className="t-cell" style={{maxWidth:"190px"}}>{moment(tenant.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                                 <td className="t-cell" style={{maxWidth:"190px"}}>{moment(tenant.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                                 <td className="t-cell text-center" style={{maxWidth:"300px"}}>
                                    <button className="btn btn-sm green-btn text-white font-weight-bold" onClick={() => this.editTenant(tenant.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                    <button className="btn btn-sm red-btn text-white font-weight-bold" onClick={() => {if(window.confirm('确认删除此租户?')){this.deleteTenant(tenant.id)}}} style={{marginLeft:"10px"}}>删除</button>
                                 </td>
                             </tr>
                         )  
                     }
                 </tbody>
            </table>
            <div className="text-center">
                <button className="btn btn-sm color-btn font-weight-bold text-white" onClick={this.firstPage} disabled={(this.state.pageNo<=1 || this.state.pageNo==null) ? true : false}>first page</button>
                <button className="btn btn-sm color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo<=1 || this.state.pageNo==null) ? true : false}>previous page</button>
                <button className="btn btn-sm color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo==null||this.state.totalPages==null||this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
                <button className="btn btn-sm color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo==null||this.state.totalPages==null||this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
            </div>
            <div className="text-center color-font font-weight-bold">{this.state.pageNo} of {this.state.totalPages} 页</div>
            <div className="text-center color-font font-weight-bold">共{this.state.totalElements}租户</div>
        </div>
        )
    }
}

export default TenantComponent