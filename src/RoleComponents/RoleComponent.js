import axios from 'axios'
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
        this.addRole=this.addRole.bind(this);
        this.viewRole=this.viewRole.bind(this);
        this.editRole=this.editRole.bind(this);
        this.deleteRole=this.deleteRole.bind(this);
    }
    
    componentDidMount(){
        this.findAllRole(this.state.pageNo);
    }

    findAllRole(p){
        axios.get("/role/findallrolepaginated?pageNo="+p).then(res=>{
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
        <br></br>
        <h1 className="text-center font-weight-bold text-secondary">角色列表</h1>
        <button className="btn btn-primary btn-lg text-white font-weight-bold" onClick={this.addRole}>添加角色</button>
        <table className="table table-striped table-boarder"> 
           <thead className="text-justify">
                <tr>
                  <th  className="text-secondary text-center" style={{columnWidth:"20px"}}>id</th>
                  <th  className="text-secondary text-center" style={{columnWidth:"80px"}}>角色名称</th>  
                  <th  className="text-secondary text-center" style={{columnWidth:"50px"}}>角色类型</th>  
                  <th  className="text-secondary text-center" style={{columnWidth:"200px"}}>创建时间</th> 
                  <th  className="text-secondary text-center" style={{columnWidth:"200px"}}>更新时间</th>  
                  <th  className="text-secondary text-center" style={{columnWidth:"300px"}}>操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.roles.map(
                         role =>
                         <tr key= {role.id}>         
                             <td className="t-cell" style={{maxWidth:"20px"}}>{role.id}</td>
                             <td className="t-cell" style={{maxWidth:"80px"}}>{role.rolename}</td>
                             <td className="t-cell" style={{maxWidth:"50px"}}>{role.roletype}</td>
                             <td className="t-cell" style={{maxWidth:"200px"}}>{moment(role.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell" style={{maxWidth:"200px"}}>{moment(role.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell" style={{maxWidth:"300px"}}>
                                <button className="btn btn-info font-weight-bold" onClick={() => this.viewRole(role.id)}>查看详情</button>
                                <button className="btn btn-success font-weight-bold" onClick={() => this.editRole(role.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                <button className="btn btn-danger font-weight-bold" onClick={() => this.deleteRole(role.id)} style={{marginLeft:"10px"}}>删除</button>
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
        <div className="font-weight-bold text-center color-font">共{this.state.totalElements}角色</div>
    </div>
       )
    }
}

export default RoleComponent 