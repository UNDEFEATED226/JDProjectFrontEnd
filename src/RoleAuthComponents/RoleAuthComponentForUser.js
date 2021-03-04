import React from 'react';
import RoleAuthService from '../Service/RoleAuthService';
import AuthService from '../Service/AuthService';
import RoleService from '../Service/RoleService';
import ToDoList from '../Dropdown/ToDoList';
import Loader from 'react-loader-spinner';

class RoleAuthComponentForUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:'',
            visible:true,
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
       AuthService.findAuthByRoleid(this.state.id).then(res=>{
        this.setState({auths:res.data});
        });
     }

     roleauthForUser=(e)=>{
        e.preventDefault();
        this.setState({visible:true});
        AuthService.findAuthByRoleid(e.target.value).then(res=>{
            this.setState({
                id:e.target.value,
                auths:res.data
            });
        });
        RoleService.findById(e.target.value).then(res=>{
            this.setState({role:res.data});
        });
        this.setState({visible:false});
        console.log(this.state.visible);
     }

    onSubmit(){
            RoleAuthService.changeAuth(this.state.id,this.state.auths).catch(err=>{
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
        <div>
        <br></br>
        <h3 className="text-center font-weight-bold text-secondary" data-toggle='tooltip' title='请通过勾选框以修改权限'>角色权限管理(修改用)</h3>
        <h5 className="text-center font-weight-bold text-secondary">角色ID:{this.state.role.id}</h5>
        <h5 className="text-center font-weight-bold text-secondary">角色名称:{this.state.role.rolename}</h5>
        <div className="text-center">
        <select className="text-secondary" onChange={this.roleauthForUser} style={{width:"15rem",fontSize:"16px"}}>
        <option defaultValue value=''>请选择指定角色修改权限</option>
        {
            this.state.roles.map(
                role=>
                <option value={role.id}>{role.rolename}</option>
            )
        }
        </select>
        <Loader visible={this.state.visible} type="ThreeDots" color="#00BFFF"/>
        </div>
        <br></br>
        {
            this.state.auths.map(a=>{
                return <ToDoList toDoList={a} handleToggle={this.handleToggle}/>
            }
            )
        }
        <div className="text-center">
            <button className="btn btn-sm green-btn font-weight-bold text-white" onClick={this.onSubmit}>submit</button>
        </div>
        </div>
       )
    }
}
export default RoleAuthComponentForUser 
