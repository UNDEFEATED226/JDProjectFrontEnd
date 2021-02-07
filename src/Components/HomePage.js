import React from 'react'
import {Link} from 'react-router-dom'

class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
        return(
            <div>
                <div>
                    <ul>
                    <li>
                    <Link to="/rolelist">            
                    <h2>角色列表</h2>
                    </Link>
                    </li>
                    <li>
                    <Link to="/orgrolelist">            
                    <h2 >组织角色列表</h2>
                    </Link>
                    </li>
                    <li>
                    <Link to="/bizrolelist">            
                    <h2 >业务角色列表</h2>
                    </Link>
                    </li>
                    <br></br>
                    <li>
                    <Link to="/authlist">            
                    <h2 >权限列表</h2>
                    </Link>
                    </li>
                    <br></br>
                    <li>
                    <Link to="/tenantlist">            
                    <h2 >租户列表</h2>
                    </Link>
                    </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default HomePage