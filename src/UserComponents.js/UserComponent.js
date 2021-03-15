import React from 'react'
import UserService from '../Service/UserService'

class UserComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:1,
            users:[]
        }
        this.firstPage=this.firstPage.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.addUser=this.addUser.bind(this);
        this.viewUser=this.viewUser.bind(this);
        this.editUser=this.editUser.bind(this);
        this.deleteUser=this.deleteUser.bind(this);
        this.findAllUser=this.findAllUser.bind(this);
    }
    
    componentDidMount(){
        this.findAllUser(this.state.pageNo);
    }

    findAllUser(p){
        UserService.findAllUserPaginated(p).then(res=>{
            this.setState({users:res.data.content});
        });
        UserService.count().then(res=>{
            this.setState({totalElements:res.data});
        });
        UserService.page().then(res=>{
            this.setState({totalPages:res.data});
        });
        this.setState({pageNo:p});
    }

    firstPage=()=>{
        this.findAllUser(1);
    }

    lastPage=()=>{
        this.findAllUser(this.state.totalPages);
    }

    pageUp=()=>{
        this.findAllUser(this.state.pageNo+1);
    }

    pageDown=()=>{
        this.findAllUser(this.state.pageNo-1);
    }

    addUser(){
        this.props.history.push("/adduser");
    }

    viewUser(id){
        this.props.history.push(`/viewuser/${id}`);
    }
    editUser(id){
        this.props.history.push(`/edituser/${id}`);
    }

    deleteUser(id){
        UserService.deleteUser(id).then(res =>{
            if(this.state.pageNo === this.state.totalPages && this.state.pageNo>1){
                if(this.state.users.length === 1){
                    this.findAllUser(this.state.pageNo-1);
                }else{
                    this.findAllUser(this.state.pageNo);
                }
            }else{
                this.findAllUser(this.state.pageNo);
            }
        });
    }

    render(){
       return(
        <div>
        <h3 className="text-center" style={{color:"#666669",marginTop:"3.5%"}}>用户列表</h3>
        <button className="btn btn-sm btn-outline-primary" onClick={this.addUser}>添加用户</button>
        <table className="table table-boarder f-size" style={{color:"#666669",fontFamily:'Sans-Serif'}}> 
           <thead className="text-justify">
                <tr>
                  <th style={{columnWidth:"60px"}}>id</th>
                  <th style={{columnWidth:"120px"}}>登录用户名</th>  
                  <th style={{columnWidth:"120px"}}>名字</th>  
                  <th style={{columnWidth:"180px"}}>租户名称</th> 
                  <th style={{columnWidth:"180px"}}>组织名称</th> 
                  <th style={{columnWidth:"130px"}}>邮箱</th>  
                  <th style={{columnWidth:"100px"}}>手机号</th> 
                  <th  className="text-center" style={{columnWidth:"300px"}}>操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.users.map(
                         user =>
                         <tr key= {user.id}>         
                             <td className="t-cell" style={{maxWidth:"60px"}} data-toggle='tooltip' title={user.id}>{user.id}</td>
                             <td className="t-cell" style={{maxWidth:"120px"}} data-toggle='tooltip' title={user.loginname}>{user.loginname}</td>
                             <td className="t-cell" style={{maxWidth:"120px"}} data-toggle='tooltip' title={user.realname}>{user.realname}</td>
                             <td className="t-cell" style={{maxWidth:"180px"}} data-toggle='tooltip' title={user.tenantname}>{user.tenantname}</td>
                             <td className="t-cell" style={{maxWidth:"180px"}} data-toggle='tooltip' title={user.orgname}>{user.orgname}</td>
                             <td className="t-cell" style={{maxWidth:"130px"}} data-toggle='tooltip' title={user.email}>{user.email}</td>
                             <td className="t-cell" style={{maxWidth:"100px"}} data-toggle='tooltip' title={user.mobile}>{user.mobile}</td>
                             <td className="t-cell text-center" style={{maxWidth:"300px"}}>
                                <button className="btn btn-sm btn-outline-info" onClick={() => this.viewUser(user.id)}>🔎查看</button>
                                <button className="btn btn-sm btn-outline-success" onClick={() => this.editUser(user.id)} style={{marginLeft:"10px"}}>🛠️编辑</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => {if(window.confirm('确认删除此用户?')){this.deleteUser(user.id)}}} style={{marginLeft:"10px"}}>🗑️删除</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
        <div className="text-center">
            <button className="btn btn-sm btn-outline-dark" onClick={this.firstPage} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>first page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>previous page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
        </div>
        <div className="text-center" style={{fontSize:"12px",color:"#666669",marginTop:"10px"}}>
        <div>{this.state.pageNo} of {this.state.totalPages} 页</div>
        <div>共{this.state.totalElements}用户</div>
        </div>
        </div>
       )
    }
}

export default UserComponent 