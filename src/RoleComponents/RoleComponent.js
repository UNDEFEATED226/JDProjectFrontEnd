import React from 'react'
import moment from 'moment'
import RoleService from '../Service/RoleService'

class RoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:1,
            roles:[]
        }
        this.firstPage=this.firstPage.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.viewAuthList=this.viewAuthList.bind(this);
        this.addRole=this.addRole.bind(this);
        this.viewRole=this.viewRole.bind(this);
        this.editRole=this.editRole.bind(this);
        this.deleteRole=this.deleteRole.bind(this);
        this.findAllRole=this.findAllRole.bind(this);
    }
    
    componentDidMount(){
        this.findAllRole(this.state.pageNo);
    }

    findAllRole(p){
        RoleService.findAllRolePaginated(p).then(res=>{
            this.setState({roles:res.data.content});
        });
        RoleService.count().then(res=>{
            this.setState({totalElements:res.data});
        });
        RoleService.page().then(res=>{
            this.setState({totalPages:res.data});
        });
        this.setState({pageNo:p});
    }

    firstPage=()=>{
        this.findAllRole(1);
    }

    lastPage=()=>{
       this.findAllRole(this.state.totalPages);
    }

    pageUp=()=>{
        this.findAllRole(this.state.pageNo+1);
    }

    pageDown=()=>{
        this.findAllRole(this.state.pageNo-1);
    }

    addRole(){
        this.props.history.push("/addrole");
    }

    viewAuthList(id){
        this.props.history.push(`/authlistforrole/${id}`);
    }

    viewRole(id){
        this.props.history.push(`/viewrole/${id}`);
    }

    editRole(id){
        this.props.history.push(`/editrole/${id}`);
    }

    deleteRole(id){
        RoleService.deleteRole(id).then(res => {
            if(this.state.pageNo === this.state.totalPages && this.state.pageNo>1){
                if(this.state.roles.length === 1){
                    this.findAllRole(this.state.pageNo-1);
                }else{
                    this.findAllRole(this.state.pageNo);
                }
            }else{
                this.findAllRole(this.state.pageNo);
            }
        });
    }

    render(){
       return(
        <div>
        <h3 className="text-center" style={{color:"#666669",marginTop:"3.5%"}}>角色列表</h3>
        <button className="btn btn-sm btn-outline-primary" onClick={this.addRole}>添加角色</button>
        <table className="table" style={{color:"#666669",fontFamily:'Sans-Serif',fontSize:"12px"}}> 
           <thead className="text-justify">
                <tr>
                  <th style={{columnWidth:"50px"}}>id</th>
                  <th style={{columnWidth:"200px"}}>角色名称</th>  
                  <th style={{columnWidth:"200px"}}>角色类型</th>  
                  <th style={{columnWidth:"200px"}}>租户名称</th>  
                  <th style={{columnWidth:"190px"}}>创建时间</th> 
                  <th style={{columnWidth:"190px"}}>更新时间</th>  
                  <th  className="text-center" style={{columnWidth:"400px"}}>操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.roles.map(
                         role =>{
                             var typename='无类型';
                             if(role.roletype===1){
                                 typename = '组织角色';
                             }
                             if(role.roletype===2){
                                 typename = '业务角色';
                             }
                             return(
                            <tr key= {role.id}>         
                            <td className="t-cell" style={{maxWidth:"50px"}} data-toggle='tooltip' title={role.id}>{role.id}</td>
                            <td className="t-cell" style={{maxWidth:"200px"}} data-toggle='tooltip' title={role.rolename}>{role.rolename}</td>
                            <td className="t-cell" style={{maxWidth:"200px",color:typename==='无类型'?'red':undefined}} data-toggle='tooltip' title={role.roletype}>{typename}</td>
                            <td className="t-cell" style={{maxWidth:"200px"}} data-toggle='tooltip' title={role.tenantname}>{role.tenantname}</td>
                            <td className="t-cell" style={{maxWidth:"190px"}}>{moment(role.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td className="t-cell" style={{maxWidth:"190px"}}>{moment(role.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td className="t-cell text-center" style={{maxWidth:"400px"}}>
                               <button className="btn btn-sm btn-outline-info" onClick={()=>this.viewRole(role.id)}>🔎查看</button>
                               <button className="btn btn-sm btn-outline-success" onClick={()=>this.editRole(role.id)} style={{marginLeft:"10px"}}>🛠️编辑</button>
                               <button className="btn btn-sm btn-outline-danger" onClick={()=>{if(window.confirm('确认删除此角色?')){this.deleteRole(role.id)}}} style={{marginLeft:"10px"}}>🗑️删除</button>
                            </td>
                        </tr>)
                         })  
                 }
             </tbody>
        </table>
        <div className="text-center">
            <button className="btn btn-sm btn-outline-dark" onClick={this.firstPage} disabled={(this.state.pageNo==null||this.state.pageNo<=1) ? true : false}>first page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo==null||this.state.pageNo<=1) ? true : false}>previous page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
        </div>
        <div className="text-center" style={{marginTop:"10px",fontSize:"12px",color:"#666669"}}>
        <div>{this.state.pageNo} of {this.state.totalPages} 页</div>
        <div>共{this.state.totalElements}角色</div>
        </div>
    </div>
       )
    }
}

export default RoleComponent 