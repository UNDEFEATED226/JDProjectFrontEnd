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
         <div style={{display:"flex",justifyContent:"center"}}>
               <div className="text-center" style={{fontSize:"18px",fontFamily:"sans-serif",marginTop:"5%"}}>
                <h4 style={{color:"#666669"}}>基础功能</h4>
               <div><Link className="btn btn-sm btn-outline-dark" to="/adduser" style={{textDecoration:"none",marginTop:"10px",width:"7rem"}}>添加用户</Link></div>
               <div><Link className="btn btn-sm btn-outline-dark" to="/addorganization" style={{textDecoration:"none",marginTop:"10px",width:"7rem"}}>添加组织</Link></div>
               <div><Link className="btn btn-sm btn-outline-dark" to="/userrolelist" data-toggle='tooltip' title="跳转后请点击编辑" style={{textDecoration:"none",marginTop:"10px",width:"7rem"}}>修改用户角色</Link></div>
               <div><Link className="btn btn-sm btn-outline-dark" to="/roleauthforuser" style={{textDecoration:"none",marginTop:"10px",width:"7rem"}}>修改角色权限</Link></div>
               </div>
               <div className="text-center" style={{fontSize:"18px",fontFamily:"sans-serif",marginLeft:"20%",marginTop:"5%"}}>
                <h4 style={{color:"#666669"}}>其他功能</h4>
                <div><Link className="btn btn-sm btn-outline-dark" to="/addrole" style={{textDecoration:"none",marginTop:"10px",width:"7rem"}}>添加角色</Link></div>
                <div><Link className="btn btn-sm btn-outline-dark" data-toggle='tooltip' title="跳转后请点击编辑" to="/userlist" style={{textDecoration:"none",marginTop:"10px",width:"7rem"}}>修改用户信息</Link></div>
               </div>
         </div>
        )
    }
}

export default HomePage