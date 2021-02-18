import React from 'react'
import {Link} from 'react-router-dom'

class HeaderComponent extends React.Component{
   constructor(props){
        super(props)
        this.state={

        }
   }
   render(){
       return(
        <nav className="navbar navbar-expand-lg navbar-light color-nav">
        <Link to="/" className="navbar-brand font-weight-bold text-white">
         IOT Core 物管平台
        </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
            <Link to="/userlist" className="nav-link font-weight-bold text-white">
               用户管理
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/organizationlist" className="nav-link font-weight-bold text-white">
              组织管理
              </Link>
            </li>
            <li className="nav-item dropdown show">
            <button className="btn nav-item dropdown-toggle text-white font-weight-bold" id="bd-versions" data-toggle="dropdown" >资源管理</button>
            <div className="dropdown-menu show color-dd1" aria-labelledby="bd-versions">
              <Link to="/resourcelist" className="dropdown-item text-white font-weight-bold">资源列表</Link>
              <Link to="/iotmenu" className="dropdown-item text-white font-weight-bold">物管平台菜单</Link>
              <Link to="/iotapi" className="dropdown-item text-white font-weight-bold">物管平台API</Link>
              <Link to="/emenu" className="dropdown-item text-white font-weight-bold">能源平台菜单</Link>
              <Link to="/eapi" className="dropdown-item text-white font-weight-bold">能源平台API</Link>
              <Link to="/govmenu" className="dropdown-item text-white font-weight-bold">能源平台政府侧菜单</Link>
              <Link to="/govapi" className="dropdown-item text-white font-weight-bold">能源平台政府侧API</Link>
            </div>
            </li>
            <li className="nav-item dropdown show">
            <button className="btn nav-item dropdown-toggle text-white font-weight-bold" id="bd-versions" data-bs-toggle="dropdown">角色管理</button>
            <div className="dropdown-menu dropdown-menu-end show color-dd2"  aria-labelledby="bd-versions">
              <Link to="/rolelist" className="dropdown-item text-white font-weight-bold">角色列表</Link>
              <Link to="/orgrolelist" className="dropdown-item text-white font-weight-bold">组织角色列表</Link>
              <Link to="/bizrolelist" className="dropdown-item text-white font-weight-bold">业务角色列表</Link>
            </div>
            </li>
            <li className="nav-item font-weight-bold">
              <Link to="/authlist" className="text-white nav-link">权限管理</Link>
            </li>
            <li className="nav-item font-weight-bold">
              <Link to="/tenantlist" className="text-white nav-link">租户管理</Link>
            </li>
            <li className="nav-item font-weight-bold">
              <Link to="/userrolelist" className="text-white nav-link">用户角色管理</Link>
            </li>
            <li className="nav-item font-weight-bold">
              <Link to="/roleauthlist" className="text-white nav-link">角色权限管理</Link>
            </li>
          </ul>
        </nav>
       )
   }
}

export default HeaderComponent