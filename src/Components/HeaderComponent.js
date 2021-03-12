import React from 'react';
import {Link} from 'react-router-dom';

class HeaderComponent extends React.Component{
   constructor(props){
        super(props)
        this.state={

        }
   }
   
   render(){
       return(
        <nav className="navbar navbar-expand-lg navbar-light" style={{background:"#666669",fontSize:"12px"}} >
         <Link to="/" className="navbar-brand text-white" style={{textDecoration:"none"}}>
          🏠 IOT Admin 物管平台
        </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
            <Link to="/userlist" className="nav-link text-white">
               用户管理
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/organizationlist" className="nav-link text-white">
              组织管理
              </Link>
            </li>
            <li className="nav-item dropdown" style={{zIndex:"1000"}}>
            <button className="btn btn-sm nav-item dropdown-toggle text-white" id="dropdown1" data-toggle="dropdown" aria-haspopup="true" 
                 aria-expanded="false"><span className="f-size">资源管理</span></button>
            <div className="dropdown-menu" aria-labelledby="dropdown1" style={{background:"#666669"}}>
              <Link to="/resourcelist" className="f-size dropdown-item text-white">资源列表</Link>
              <Link to="/iotmenu" className="f-size dropdown-item text-white">物管平台菜单</Link>
              <Link to="/iotapi" className="f-size dropdown-item text-white">物管平台API</Link>
              <Link to="/emenu" className="f-size dropdown-item text-white">能源平台菜单</Link>
              <Link to="/eapi" className="f-size dropdown-item text-white">能源平台API</Link>
              <Link to="/govmenu" className="f-size dropdown-item text-white">能源平台政府侧菜单</Link>
              <Link to="/govapi" className="f-size dropdown-item text-white">能源平台政府侧API</Link>
            </div>
            </li>
            <li className="nav-item dropdown" style={{zIndex:"1000"}}>
            <button className="btn btn-sm dropdown-toggle text-white" id="dropdown2" data-toggle="dropdown" aria-haspopup="true" 
                 aria-expanded="false"><span className="f-size">角色管理</span></button>
            <div className="dropdown-menu" aria-labelledby="dropdown2" style={{background:"#666669"}}>
              <Link to="/rolelist" className="f-size dropdown-item text-white">角色列表</Link>
              <Link to="/orgrolelist" className="f-size dropdown-item text-white">组织角色列表</Link>
              <Link to="/bizrolelist" className="f-size dropdown-item text-white">业务角色列表</Link>
            </div>
            </li>
            <li className="nav-item">
              <Link to="/authlist" className="text-white nav-link">权限管理</Link>
            </li>
            <li className="nav-item">
              <Link to="/tenantlist" className="text-white nav-link">租户管理</Link>
            </li>
            <li className="nav-item">
              <Link to="/userrolelist" className="text-white nav-link">用户角色管理</Link>
            </li>
            <li className="nav-item">
              <Link to="/roleauthforuser" className="text-white nav-link">角色权限管理</Link>
            </li>
          </ul>
        </nav>
       )
   }
}

export default HeaderComponent