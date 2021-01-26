import React from 'react'

class HeaderComponent extends React.Component{
   constructor(props){
        super(props)
        this.state={

        }
   }
   render(){
       return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="http://localhost:3000">IOT Core 物管平台</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/userlist">用户管理</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/organizationlist">公司管理</a>
            </li>
          </ul>
        </div>
        </nav>
       )
   }
}

export default HeaderComponent