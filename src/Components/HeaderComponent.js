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
            <li className="nav-item">
            <Link to="/resourcelist" className="nav-link font-weight-bold text-white">            
              资源管理
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/iotmenu" className="nav-link font-weight-bold text-white">            
              iotmenu
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/iotapi" className="nav-link font-weight-bold text-white">            
              iotapi
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/emenu" className="nav-link font-weight-bold text-white">            
              emenu
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/eapi" className="nav-link font-weight-bold text-white">            
              eapi
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/govmenu" className="nav-link font-weight-bold text-white">            
              govmenu
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/govapi" className="nav-link font-weight-bold text-white">            
              govapi
            </Link>
            </li>
          </ul>
        </nav>
       )
   }
}

export default HeaderComponent