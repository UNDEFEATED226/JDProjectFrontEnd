import React from 'react';
import RoleAuthService from '../Service/RoleAuthService';
import AuthService from '../Service/AuthService';
import RoleService from '../Service/RoleService';
import {Multiselect} from  'multiselect-react-dropdown'

class RoleAuthComponentForUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            role:{},
            ownauths:[],
            auths:[],
            addRes:[],
            deleteRes:[]
     }  
     this.addAuthHandler=this.addAuthHandler.bind(this);
     this.deleteAuthHandler=this.deleteAuthHandler.bind(this);
     this.multiselectRef=React.createRef();
     this.deleteRef=React.createRef();
    }
    
    componentDidMount(){
       RoleService.findById(this.state.id).then(res=>{
           this.setState({role:res.data});
       });
       RoleAuthService.findByRoleid(this.state.id).then(res=>{
        this.setState({ownauths:res.data});
        });
        AuthService.findAllAuthOrderbyresid().then(res=>{
            this.setState({auths:res.data});
        });
     }

    addAuthHandler=(a)=>{
        a.preventDefault();
        this.setState({addRes:this.multiselectRef.current.getSelectedItems()});
        this.multiselectRef.current.getSelectedItems().forEach(r=>{
            RoleAuthService.addRoleAuth({id:'',roleid:this.state.id,authid:r.id,isdeleted:0,createtime:'',updatetime:''}); 
        });
        this.props.history.push("/roleauthlist");
    }

    deleteAuthHandler=(a)=>{
        a.preventDefault();
        this.setState({deleteRes:this.deleteRef.current.getSelectedItems()});
        this.deleteRef.current.getSelectedItems().forEach(r=>{
            RoleAuthService.deleteRoleAuth(r.id);
        });
        this.props.history.push("/roleauthlist");
    }

    render(){  
        this.state.ownauths.forEach(a=>{
            a.fullname="角色权限ID:"+a.id+",权限名称:"+a.authname;
        });
        this.state.auths.forEach(a=>{
            a.fullname="权限ID:"+a.id+", 权限名称:"+a.authname;
        });
       return(
        <div>
        <br></br>
        <h3 className="font-weight-bold text-secondary text-center">角色ID:{this.state.role.id}</h3>
        <h3 className="font-weight-bold text-secondary text-center">角色名称:{this.state.role.rolename}</h3>
      
        <label className="font-weight-bold color-font">删除已有权限:</label>
       <div>
           <Multiselect options={this.state.ownauths} displayValue='fullname' value='id' groupBy='resname' placeholder='请删除已有权限' emptyRecordMsg='无可选项' 
           hidePlaceholder={true} showCheckbox={true} closeOnSelect={false} ref={this.deleteRef}/>
       </div>

       <div className="text-center">
       <button className="btn red-btn text-white font-weight-bold" onClick={this.deleteAuthHandler}>删除</button>
       </div>

       <label className="font-weight-bold color-font">添加权限:</label>
       <div>
        <Multiselect options={this.state.auths} displayValue='fullname' value='id' groupBy='resname' placeholder='请添加权限' emptyRecordMsg='无可选项'
         hidePlaceholder={true} showCheckbox={true} closeOnSelect={false} ref={this.multiselectRef}/>
        </div>

        <div className="text-center">
       <button className="btn green-btn text-white font-weight-bold" onClick={this.addAuthHandler}>添加</button>
       </div>

        </div>
       )
    }
}
export default RoleAuthComponentForUser 