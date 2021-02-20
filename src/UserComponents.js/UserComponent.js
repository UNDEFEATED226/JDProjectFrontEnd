import axios from 'axios';
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
        axios.get("/user/findalluserpaginated?pageNo="+p).then(res=>{
            this.setState({
                users:res.data.content
            });
        });
        UserService.count().then(res=>{
            this.setState({
                totalElements:res.data
            });
        });
        UserService.page().then(res=>{
            this.setState({
                totalPages:res.data
            });
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
        })
    }

    render(){
       return(
        <div>
        <br></br>
        <h1 className="text-center font-weight-bold text-secondary">用户列表</h1>
        <button className="btn btn-primary btn-lg text-white font-weight-bold" onClick={this.addUser}>添加用户</button>
        <table className="table table-striped table-boarder"> 
           <thead className="text-justify">
                <tr>
                  <th  className="text-secondary text-center" style={{columnWidth:"20px"}}>id</th>
                  <th  className="text-secondary text-center" style={{columnWidth:"100px"}}>登录用户名</th>  
                  <th  className="text-secondary text-center" style={{columnWidth:"100px"}}>名字</th>  
                  <th  className="text-secondary text-center" style={{columnWidth:"100px"}}>组织名称</th> 
                  <th  className="text-secondary text-center" style={{columnWidth:"100px"}}>邮箱</th>  
                  <th  className="text-secondary text-center" style={{columnWidth:"100px"}}>手机号</th> 
                  <th  className="text-secondary text-center" style={{columnWidth:"300px"}}>操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.users.map(
                         user =>
                         <tr key= {user.id}>         
                             <td className="t-cell" style={{maxWidth:"20px"}}>{user.id}</td>
                             <td className="t-cell" style={{maxWidth:"100px"}}>{user.loginname}</td>
                             <td className="t-cell" style={{maxWidth:"100px"}}>{user.realname}</td>
                             <td className="t-cell" style={{maxWidth:"100px"}}>{user.orgid}</td>
                             <td className="t-cell" style={{maxWidth:"100px"}}>{user.email}</td>
                             <td className="t-cell" style={{maxWidth:"100px"}}>{user.mobile}</td>
                             <td className="t-cell" style={{maxWidth:"300px"}}>
                                <button className="btn btn-info font-weight-bold" onClick={() => this.viewUser(user.id)}>查看详情</button>
                                <button className="btn btn-success font-weight-bold" onClick={() => this.editUser(user.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                <button className="btn btn-danger font-weight-bold" onClick={() => this.deleteUser(user.id)} style={{marginLeft:"10px"}}>删除</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
        <div className="centered">
            <button className="btn color-btn btn-sm font-weight-bold" onClick={this.firstPage} disabled={this.state.pageNo<=1 ? true : false}>first page</button>
            <button className="btn color-btn btn-sm font-weight-bold" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={this.state.pageNo<=1 ? true : false}>previous page</button>
            <button className="btn color-btn btn-sm font-weight-bold" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={this.state.pageNo>=this.state.totalPages ? true : false}>next page</button>
            <button className="btn color-btn btn-sm font-weight-bold" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={this.state.pageNo>=this.state.totalPages ? true : false}>last page</button>
        </div>
        <div className="font-weight-bold text-center color-font">{this.state.pageNo} of {this.state.totalPages} 页</div>
        <div className="font-weight-bold text-center color-font">共{this.state.totalElements}用户</div>
        </div>
       )
    }
}

export default UserComponent 