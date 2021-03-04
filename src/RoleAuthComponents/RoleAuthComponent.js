import React from 'react'
import moment from 'moment'
import RoleAuthService from '../Service/RoleAuthService'

class RoleAuthComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:1,
            id:'',
            roleauths:[]
        }
        this.firstPage=this.firstPage.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.addRoleAuth=this.addRoleAuth.bind(this);
        this.editRoleAuth=this.editRoleAuth.bind(this);
        this.deleteRoleAuth=this.deleteRoleAuth.bind(this);
        this.findAllRoleAuth=this.findAllRoleAuth.bind(this);

        this.roleauthForUser=this.roleauthForUser.bind(this);
    }
    
    componentDidMount(){
        this.findAllRoleAuth(this.state.pageNo);
    }

    findAllRoleAuth(p){
        RoleAuthService.findAllRoleAuthPaginated(p).then(res=>{
            this.setState({roleauths:res.data.content});
        });
        RoleAuthService.count().then(res=>{
            this.setState({totalElements:res.data});
        });
        RoleAuthService.page().then(res=>{
            this.setState({totalPages:res.data});
        });
        this.setState({pageNo:p});
    }

    firstPage=()=>{
        this.findAllRoleAuth(1);
    }

    lastPage=()=>{
        this.findAllRoleAuth(this.state.totalPages);
    }

    pageUp=()=>{
        this.findAllRoleAuth(this.state.pageNo+1);
    }

    pageDown=()=>{
        this.findAllRoleAuth(this.state.pageNo-1);
    }

    roleauthForUser=(event)=>{
        this.props.history.push("/roleauth/"+event.target.value);
    }

    addRoleAuth(){
        this.props.history.push("/addroleauth");
    }

    editRoleAuth(id){
        this.props.history.push(`/editroleauth/${id}`);
    }

    deleteRoleAuth(id){
        RoleAuthService.deleteRoleAuth(id).then(res => {
            if(this.state.pageNo === this.state.totalPages && this.state.pageNo>1){
                if(this.state.roleauths.length === 1){
                    this.findAllRoleAuth(this.state.pageNo-1);
                }else{
                    this.findAllRoleAuth(this.state.pageNo);
                }
            }else{
                this.findAllRoleAuth(this.state.pageNo);
            }
        })
    }

    render(){
       return(
        <div>
        <br></br>
        <h3 className="text-center font-weight-bold text-secondary">角色权限列表</h3>
        <table className="table f-size table-boarder" style={{marginTop:"2.5%",color:"grey"}}> 
           <thead className="text-justify">
                <tr>
                  <th style={{columnWidth:"50px"}}>ID</th>
                  <th style={{columnWidth:"200px"}}>角色名称</th>  
                  <th style={{columnWidth:"200px"}}>权限名称</th>  
                  <th style={{columnWidth:"200px"}}>资源名称</th>  
                  <th style={{columnWidth:"190px"}}>创建时间</th> 
                  <th style={{columnWidth:"190px"}}>更新时间</th>  
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.roleauths.map(
                         roleauth =>
                         <tr key= {roleauth.id}>         
                             <td className="t-cell" style={{maxWidth:"50px"}} data-toggle='tooltip' title={roleauth.id}>{roleauth.id}</td>
                             <td className="t-cell" style={{maxWidth:"200px",color:roleauth.rolename ==='角色不存在或已删除' ? 'red':undefined}} data-toggle='tooltip' title={roleauth.rolename}>{roleauth.rolename}</td>
                             <td className="t-cell" style={{maxWidth:"200px",color:roleauth.authname ==='权限不存在或已删除' ? 'red':undefined}} data-toggle='tooltip' title={roleauth.authname}>{roleauth.authname}</td>
                             <td className="t-cell" style={{maxWidth:"200px",color:roleauth.resname === '资源不存在或已删除' ? 'red':undefined}} data-toggle='tooltip' title={roleauth.resname}>{roleauth.resname}</td>
                             <td className="t-cell" style={{maxWidth:"190ox"}}>{moment(roleauth.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell" style={{maxWidth:"190px"}}>{moment(roleauth.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
        <div className="text-center">
                 <button className="btn btn-sm color-btn font-weight-bold text-white" onClick={this.firstPage} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>first page</button>
                 <button className="btn btn-sm color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>previous page</button>
                 <button className="btn btn-sm color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
                 <button className="btn btn-sm color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
        </div>
        <div className="color-font font-weight-bold text-center">{this.state.pageNo} of {this.state.totalPages} 页</div>
        <div className="color-font font-weight-bold text-center">共{this.state.totalElements}角色权限</div>
    </div>
       )
    }
}

export default RoleAuthComponent 