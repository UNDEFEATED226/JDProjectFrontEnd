import React from 'react';
import {Link} from 'react-router-dom';

class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
        return(
         <div>
               <div className="text-center" style={{fontSize:"18px",fontFamily:"sans-serif",width:"44%",marginLeft:"10%",display:"inline-block",marginRight:"1%",marginTop:"10%"}}>
                <h4 style={{color:"#666669"}}>基础功能</h4>
               <div><Link to="/adduser" style={{textDecoration:"none",color:"#666669"}}>添加用户</Link></div>
               <div><Link to="/addorganization" style={{textDecoration:"none",color:"#666669"}}>添加组织</Link></div>
               <div><Link to="/userrolelist" style={{textDecoration:"none",color:"#666669"}}>修改用户角色(跳转后请点击编辑)</Link></div>
               <div><Link to="/roleauthforuser" style={{textDecoration:"none",color:"#666669"}}>修改角色权限</Link></div>
               </div>
               <div className="text-center" style={{fontSize:"18px",fontFamily:"sans-serif",width:"44%",marginLeft:"10%",marginTop:"5%"}}>
                <h4 style={{color:"#666669"}}>其他功能</h4>
                <div><Link to="/addrole" style={{textDecoration:"none",color:"#666669"}}>添加角色</Link></div>
                <div><Link to="/userlist" style={{textDecoration:"none",color:"#666669"}}>修改用户信息(跳转后请点击编辑)</Link></div>
               </div>
         </div>
        )
    }
}

export default HomePage