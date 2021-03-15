import React from 'react'
import moment from 'moment'
import UserRoleService from '../Service/UserRoleService';
import RoleService from '../Service/RoleService';

class UserRoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:1,
            userroles:[],
            roleid:'',
            roles:[],
            userrole:{}
        }
        this.firstPage=this.firstPage.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.editUserRole=this.editUserRole.bind(this);
        this.findAllUserRole=this.findAllUserRole.bind(this);
        this.deleteUserRole=this.deleteUserRole.bind(this);
        this.addUserRole=this.addUserRole.bind(this);
    }
    
    componentDidMount(){
        this.findAllUserRole(this.state.pageNo);
        RoleService.findAllRole().then(res=>{
            this.setState({roles:res.data});
        });
    }

    findAllUserRole(p){
        UserRoleService.findAllUserRolePaginated(p).then(res=>{
            this.setState({userroles:res.data.content});
        });
        UserRoleService.count().then(res=>{
            this.setState({totalElements:res.data});
        });
        UserRoleService.page().then(res=>{
            this.setState({totalPages:res.data});
        });
        this.setState({pageNo:p});
    }

    firstPage=()=>{
        this.findAllUserRole(1);
    }

    lastPage=()=>{
        this.findAllUserRole(this.state.totalPages);
    }

    pageUp=()=>{
        this.findAllUserRole(this.state.pageNo+1);
    }

    pageDown=()=>{
        this.findAllUserRole(this.state.pageNo-1);
    }
    
    addUserRole(){
        this.props.history.push("/adduserrole");
    }

    changeRoleidHandler=(event)=>{
        this.setState({roleid:event.target.value});
    }

    editUserRole(){
        let ur = {id:this.state.userrole.id,userid:this.state.userrole.userid,roleid:this.state.roleid,
        isdeleted:this.state.userrole.isdeleted,createtime:this.state.userrole.createtime,updatetime:this.state.userrole.updatetime};
        UserRoleService.editUserRole(this.state.userrole.id,ur);
        UserRoleService.findAllUserRolePaginated(this.state.pageNo).then(res=>{
            this.setState({userroles:res.data.content});
        });
    }

    deleteUserRole(id){
        UserRoleService.deleteUserRole(id).then(res => {
            if(this.state.pageNo === this.state.totalPages && this.state.pageNo>1){
                if(this.state.userroles.length === 1){
                    this.findAllUserRole(this.state.pageNo-1);
                }else{
                    this.findAllUserRole(this.state.pageNo);
                }
            }else{
                this.findAllUserRole(this.state.pageNo);
            }
        });
    }

    render(){
       return(
        <div>
        <div className="modal fade" id="edit" tabIndex="-1" role="dialog" aria-labelledby="label1" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" style={{color:"#666669"}} id="label1">用户{this.state.userrole.username}</h5>
                </div>
                <div className="modal-body">
                    <select className="form-control" style={{fontSize:"12px",color:"#666669",fontFamily:"sans-serif"}} onClick={this.changeRoleidHandler}>
                        {
                            this.state.roles.map(
                                role=>
                                <option key={role.id} value={role.id}>{role.rolename}</option>
                            )
                        }
                    </select>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-sm btn-outline-success" data-dismiss="modal" disabled={this.state.roleid ==='' ? true : false} onClick={this.editUserRole}>确认</button>
                    <button className="btn btn-sm btn-outline-danger" data-dismiss="modal" style={{marginLeft:"10px"}}>取消</button>
                </div>
            </div>
            </div>
        </div>
        <h3 className="text-center" style={{color:"#666669",marginTop:"3.5%"}}>用户角色列表</h3>
        <button className="btn btn-sm btn-outline-primary" onClick={this.addUserRole}>添加用户角色</button>
        <table className="table f-size table-boarder" style={{color:"#666669",fontFamily:'Sans-Serif'}}> 
           <thead className="text-justify">
                <tr>
                  <th style={{columnWidth:"60px"}}>id</th>
                  <th style={{columnWidth:"60px"}}>用户ID</th>  
                  <th className="text-center" style={{columnWidth:"150px"}}>用户名字</th>  
                  <th style={{columnWidth:"60px"}}>角色ID</th>  
                  <th className="text-center" style={{columnWidth:"150px"}}>角色名称</th>  
                  <th style={{columnWidth:"180px"}}>创建时间</th> 
                  <th style={{maxcolumnWidthWidth:"180px"}}>更新时间</th>  
                  <th className="text-center" style={{columnWidth:"200px"}}>操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.userroles.map(
                        userrole =>
                         <tr key= {userrole.id}>         
                             <td className="t-cell" style={{maxWidth:"60px"}} data-toggle='tooltip' title={userrole.id}>{userrole.id}</td>
                             <td className="t-cell" style={{maxWidth:"60px"}} data-toggle='tooltip' title={userrole.userid}>{userrole.userid}</td>
                             <td className="t-cell" style={{maxWidth:"150px",color:userrole.username ==='用户不存在或已删除' ? 'red':undefined}} data-toggle='tooltip' title={userrole.username}>{userrole.username}</td>
                             <td className="t-cell" style={{maxWidth:"60px"}} data-toggle='tooltip' title={userrole.roleid}>{userrole.roleid}</td>
                             <td className="t-cell" style={{maxWidth:"150px",color:userrole.rolename ==='角色不存在或已删除' ? 'red':undefined}} data-toggle='tooltip' title={userrole.rolename}>{userrole.rolename}</td>
                             <td className="t-cell" style={{maxWidth:"180px"}}>{moment(userrole.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell" style={{maxWidth:"180px"}}>{moment(userrole.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell text-center" style={{maxWidth:"200px"}}>
                                <button className="btn btn-sm btn-outline-success" data-toggle="modal" data-target="#edit" onClick={()=>{this.setState({userrole:userrole})}}>🛠️编辑</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => {if(window.confirm('确认删除此用户角色?')){ this.deleteUserRole(userrole.id)}}} style={{marginLeft:"10px"}}>🗑️删除</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
        <div className="text-center">
                 <button className="btn btn-sm btn-outline-dark" onClick={this.firstPage} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true :false}>first page</button>
                 <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true :false}>previous page</button>
                 <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
                 <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
        </div>
       <div className="text-center" style={{fontSize:"12px",color:"#666669",marginTop:"10px",fontFamily:"sans-serif"}}>
       <div>{this.state.pageNo} of {this.state.totalPages} 页</div>
        <div>共{this.state.totalElements}用户角色</div>
       </div>
    </div>
       )
    }
}

export default UserRoleComponent 