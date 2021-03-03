import React from 'react'
import moment from 'moment'
import UserRoleService from '../Service/UserRoleService';

class UserRoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:1,
            userroles:[]
        }
        this.firstPage=this.firstPage.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.findAllUserRole=this.findAllUserRole.bind(this);
        this.deleteUserRole=this.deleteUserRole.bind(this);
        this.addUserRole=this.addUserRole.bind(this);
    }
    
    componentDidMount(){
        this.findAllUserRole(this.state.pageNo);
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
        <br></br>
        <h3 className="text-center font-weight-bold text-secondary">用户角色列表</h3>
        <button className="btn blue-btn btn-sm text-white font-weight-bold" onClick={this.addUserRole}>添加用户角色</button>
        <table className="table f-size table-boarder" style={{color:"grey"}}> 
           <thead className="text-justify">
                <tr>
                  <th style={{columnWidth:"50px"}}>id</th>
                  <th style={{columnWidth:"50px"}}>用户ID</th>  
                  <th style={{columnWidth:"150px"}}>用户名字</th>  
                  <th style={{columnWidth:"50px"}}>角色ID</th>  
                  <th style={{columnWidth:"150px"}}>角色名称</th>  
                  <th style={{columnWidth:"180px"}}>创建时间</th> 
                  <th style={{maxcolumnWidthWidth:"180px"}}>更新时间</th>  
                  <th className="text-center" style={{columnWidth:"150px"}}>操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.userroles.map(
                        userrole =>
                         <tr key= {userrole.id}>         
                             <td className="t-cell" style={{maxWidth:"50px"}} data-toggle='tooltip' title={userrole.id}>{userrole.id}</td>
                             <td className="t-cell" style={{maxWidth:"50px"}} data-toggle='tooltip' title={userrole.userid}>{userrole.userid}</td>
                             <td className="t-cell" style={{maxWidth:"150px",color:userrole.username ==='用户不存在或已删除' ? 'red':undefined}} data-toggle='tooltip' title={userrole.username}>{userrole.username}</td>
                             <td className="t-cell" style={{maxWidth:"50px"}} data-toggle='tooltip' title={userrole.roleid}>{userrole.roleid}</td>
                             <td className="t-cell" style={{maxWidth:"150px",color:userrole.rolename ==='角色不存在或已删除' ? 'red':undefined}} data-toggle='tooltip' title={userrole.rolename}>{userrole.rolename}</td>
                             <td className="t-cell" style={{maxWidth:"180px"}}>{moment(userrole.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell" style={{maxWidth:"180px"}}>{moment(userrole.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell text-center" style={{maxWidth:"150px"}}>
                                <button className="btn btn-sm red-btn text-white font-weight-bold" onClick={() => {if(window.confirm('确认删除此用户角色?')){ this.deleteUserRole(userrole.id)}}} style={{marginLeft:"10px"}}>删除</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
        <div className="text-center">
                 <button className="btn btn-sm color-btn font-weight-bold text-white" onClick={this.firstPage} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true :false}>first page</button>
                 <button className="btn btn-sm color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true :false}>previous page</button>
                 <button className="btn btn-sm color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
                 <button className="btn btn-sm color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
        </div>
        <div className="font-weight-bold color-font text-center">{this.state.pageNo} of {this.state.totalPages} 页</div>
        <div className="font-weight-bold color-font text-center">共{this.state.totalElements}用户角色</div>
    </div>
       )
    }
}

export default UserRoleComponent 