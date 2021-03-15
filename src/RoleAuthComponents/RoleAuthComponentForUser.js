import React from 'react';
import RoleAuthService from '../Service/RoleAuthService';
import RoleService from '../Service/RoleService';
import AuthList from '../Dropdown/AuthList';

class RoleAuthComponentForUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:'',
            role:{},
            roles:[],
            auths:[]
     }  
     this.onSubmit=this.onSubmit.bind(this);
    }
    
    componentDidMount(){
       RoleService.findAllRole().then(res=>{
           this.setState({roles:res.data});
       });
     }
    
      roleauthForUser=(e)=>{ 
          e.preventDefault();
          RoleService.findById(e.target.value).then(res=>{
            this.setState({role:res.data}); 
         }); 
          RoleAuthService.authListByRoleid(e.target.value).then(res=>{
            this.setState({auths:res.data}); 
            }); 
        }


    onSubmit(){
        RoleAuthService.changeAuth(this.state.role.id,this.state.auths).catch(err=>{
                    console.error("INPUT ERROR")
        });
    }

     handleToggle = (id) => {
        let mapped = this.state.auths.map(task => {
         return task.map(a =>{
              return a.id === id ? { ...a, selected: !a.selected } : { ...a};
          }
          )
        });
        this.setState({auths:mapped});
      }

    render(){  
        return( 
        <div style={{marginTop:"3.5%"}}>
        <div className="text-center" style={{color:"#666669"}}>
        <h3 data-toggle='tooltip' title='请通过勾选框以修改权限'>角色权限管理</h3>
        <h5>角色ID:{this.state.role.id}</h5>
        <h5>角色名称:{this.state.role.rolename}</h5>
        </div>
        <div className="text-center">
        <select onChange={this.roleauthForUser} style={{width:"20rem",fontSize:"16px",color:"#666669",marginTop:"2.5%"}}>
        <option defaultValue value=''>请选择指定角色修改权限...</option>
        {
            this.state.roles.map(
                role=>
                <option key={role.id} value={role.id}>{role.rolename}</option>
            )
        }
        </select>
        </div>
        <div style={{marginTop:"2.5%"}}>
        {
             this.state.auths.map(a=>{
                return <AuthList key={a[0].id} AuthList={a} handleToggle={this.handleToggle}/>
            })
        }
        </div>
        <div className="text-center" style={{marginTop:"1.5%"}}>
            <button className="btn btn-sm btn-outline-success" onClick={this.onSubmit}>submit</button>
            <button className="btn btn-sm btn-outline-danger" onClick={()=>{this.props.history.goBack()}} style={{marginLeft:"15px"}}>cancel</button>
        </div>     
        </div>
       )
    }
}
export default RoleAuthComponentForUser 
