import React from 'react'
import moment from 'moment'
import AuthService from '../Service/AuthService'
import axios from 'axios'

class AuthComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:1,
            auths:[]
        }
        this.firstPage=this.firstPage.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.addAuth=this.addAuth.bind(this);
        this.editAuth=this.editAuth.bind(this);
        this.deleteAuth=this.deleteAuth.bind(this);
        this.findAllAuth=this.findAllAuth.bind(this);
    }
    
    componentDidMount(){
        this.findAllAuth(this.state.pageNo);
    }

    findAllAuth(p){
        axios.get("/auth/findallauthpaginated?pageNo="+p).then(res=>{
            this.setState({auths:res.data.content});
        });
        AuthService.page().then(res=>{
            this.setState({totalPages:res.data});
        });
        AuthService.count().then(res=>{
            this.setState({totalElements:res.data});
        });
        this.setState({pageNo:p});
    }

    firstPage=()=>{
        this.findAllAuth(1);
    }
    
    lastPage=()=>{
        this.findAllAuth(this.state.totalPages);
    }

    pageUp=()=>{
        this.findAllAuth(this.state.pageNo+1);
    }

    pageDown=()=>{
        this.findAllAuth(this.state.pageNo-1);
    }

    addAuth(){
        this.props.history.push("/addauth");
    }

    editAuth(id){
        this.props.history.push(`/editauth/${id}`);
    }

    deleteAuth(id){
        AuthService.deleteAuth(id).then(res => {
            if(this.state.pageNo === this.state.totalPages && this.state.pageNo>1){
                if(this.state.auths.length === 1){
                    this.findAllAuth(this.state.pageNo-1);
                }else{
                    this.findAllAuth(this.state.pageNo);
                }
            }else{
                this.findAllAuth(this.state.pageNo);
            }
        })
    }

    render(){
       return(
        <div>
        <br></br>
        <h1 className="text-center font-weight-bold text-secondary">权限列表</h1>
        <button className="btn btn-primary btn-lg text-white font-weight-bold" onClick={this.addAuth}>添加权限</button>
        <table className="table table-border"> 
           <thead className="text-justify">
                <tr>
                 <th  className="text-secondary">id</th>
                  <th  className="text-secondary">权限名称</th>  
                  <th  className="text-secondary">描述信息</th>  
                  <th  className="text-secondary">资源ID</th> 
                  <th className="text-secondary">创建时间</th>
                  <th className="text-secondary">最后一次更新时间</th>
                  <th  className="text-secondary">操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.auths.map(
                         auth =>
                         <tr key= {auth.id}>         
                             <td>{auth.id}</td>
                             <td>{auth.authname}</td>
                             <td>{auth.description}</td>
                             <td>{auth.resid}</td>
                             <td>{moment(auth.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td>{moment(auth.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td>
                                <button className="btn btn-success font-weight-bold" onClick={()=>this.editAuth(auth.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                <button className="btn btn-danger font-weight-bold" onClick={()=>this.deleteAuth(auth.id)} style={{marginLeft:"10px"}}>删除</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
        <div className="centered">
            <button className="btn color-btn font-weight-bold text-white" onClick={this.firstPage} disabled={(this.state.pageNo == null || this.state.pageNo<=1) ? true : false}>first page</button>
            <button className="btn color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo == null || this.state.pageNo<=1) ? true :false}>previous page</button>
            <button className="btn color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo == null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
            <button className="btn color-btn font-weight-bold text-white" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo == null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
        </div>
        <div className="color-font text-center font-weight-bold">{this.state.pageNo} of {this.state.totalPages} 页</div>
        <div className="color-font text-center font-weight-bold">共{this.state.totalElements}权限</div>
    </div>
       )
    }
}

export default AuthComponent 