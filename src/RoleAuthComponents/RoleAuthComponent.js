import React from 'react'
import moment from 'moment'
import RoleAuthService from '../Service/RoleAuthService'

class RoleAuthComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:1,
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
        <button className="btn blue-btn btn-sm text-white font-weight-bold" onClick={this.addRoleAuth}>添加角色权限</button>
        <table className="table f-size table-boarder"> 
           <thead className="text-justify">
                <tr>
                 <th  className="text-secondary" style={{columnWidth:"30px"}}>ID</th>
                  <th  className="text-secondary" style={{columnWidth:"60px"}}>角色ID</th>  
                  <th  className="text-secondary" style={{columnWidth:"60px"}}>权限ID</th>  
                  <th  className="text-secondary" style={{columnWidth:"190px"}}>创建时间</th> 
                  <th  className="text-secondary" style={{columnWidth:"190px"}}>更新时间</th>  
                  <th  className="text-secondary text-center" style={{columnWidth:"260px"}}>操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.roleauths.map(
                         roleauth =>
                         <tr key= {roleauth.id}>         
                             <td className="t-cell" style={{maxWidth:"30px"}}>{roleauth.id}</td>
                             <td className="t-cell" style={{maxWidth:"60px"}}>{roleauth.roleid}</td>
                             <td className="t-cell" style={{maxWidth:"60px"}}>{roleauth.authid}</td>
                             <td className="t-cell" style={{maxWidth:"190ox"}}>{moment(roleauth.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell" style={{maxWidth:"190px"}}>{moment(roleauth.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell text-center" style={{maxWidth:"260px"}}>
                                <button className="btn btn-sm green-btn text-white font-weight-bold" onClick={() => this.editRoleAuth(roleauth.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                <button className="btn btn-sm red-btn text-white font-weight-bold" onClick={() => this.deleteRoleAuth(roleauth.id)} style={{marginLeft:"10px"}}>删除</button>
                             </td>
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