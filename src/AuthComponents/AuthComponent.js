import React from 'react'
import AuthService from '../Service/AuthService'

class AuthComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            auths:[]
        }
        this.addAuth=this.addAuth.bind(this);
        this.editAuth=this.editAuth.bind(this);
        this.deleteAuth=this.deleteAuth.bind(this);
    }
    
    componentDidMount(){
        AuthService.findAllAuth().then((response) => {
            this.setState({auths:response.data})
        });
    }

    addAuth(){
        this.props.history.push("/addauth");
    }

    editAuth(id){
        this.props.history.push(`/editauth/${id}`);
    }

    deleteAuth(id){
        AuthService.deleteAuth(id).then(res => {
            this.setState({auths:this.state.auths.filter(auth => auth.id!==id)});
        })
    }

    render(){
       return(
        <div>
        <br></br>
        <h1 className="text-center font-weight-bold text-secondary">权限列表</h1>
        <button className="btn btn-secondary btn-lg text-white font-weight-bold" onClick={this.addAuth}>添加权限</button>
        <table className="table table-striped table-boarder"> 
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
                             <td>{auth.createtime}</td>
                             <td>{auth.updatetime}</td>
                             <td>
                                <button className="btn btn-secondary font-weight-bold" onClick={() => this.editAuth(auth.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                <button className="btn btn-danger font-weight-bold" onClick={() => this.deleteAuth(auth.id)} style={{marginLeft:"10px"}}>删除</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
    </div>
       )
    }
}

export default AuthComponent 