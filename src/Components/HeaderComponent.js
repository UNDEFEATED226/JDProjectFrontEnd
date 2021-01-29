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
        <Link to="" className="navbar-brand font-weight-bold text-white">
         IOT Core 物管平台
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <Link to="/userlist" className="nav-link font-weight-bold text-white">
              <li className="nav-item">
               用户管理
              </li>
            </Link>
            <Link to="/organizationlist" className="nav-link font-weight-bold text-white">
            <li className="nav-item">
              组织管理
            </li>
            </Link>
          </ul>
        </div>
        </nav>
       )
   }
}

export default HeaderComponent