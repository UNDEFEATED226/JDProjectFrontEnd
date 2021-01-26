import React from 'react'
import OrganizationService from '../Service/OrganizationService';

class OrganizationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            organizations:[]
        }
        this.addOrganization=this.addOrganization.bind(this);
        this.viewOrganization=this.viewOrganization.bind(this);
    }

    componentDidMount(){
        OrganizationService.findAllOrganization().then((response) => {
            this.setState({organizations:response.data})
        });
    }

    addOrganization(){
        this.props.history.push("/addorganization");
    }

    viewOrganization(id){
        this.props.history.push(`/vieworganization/${id}`);
    }

    render(){
        return(
            <div>
            <br></br>
            <h1 className="text-center">组织列表</h1>
            <button className="btn btn-primary" onClick={this.addOrganization}>添加组织</button>
            <div className="row">
            </div>
            <table className="table table-striped table-boarder"> 
               <thead>
                    <tr>
                      <th>id</th>  
                      <th>组织名称</th>     
                      <th>组织层级</th>  
                      <th>组织类型ID</th>  
                      <th>组织类型名称</th> 
                      <th>组织种类</th>  
                      <th>基准组织编码</th>  
                      <th>租户ID</th>  
                      <th>操作</th>
                    </tr>
                    </thead>
                 <tbody>
                     {
                         this.state.organizations.map(
                             organization =>
                             <tr key= {organization.id}>
                                 <td>{organization.id}</td>
                                 <td>{organization.orgname}</td>
                                 <td>{organization.orglevel}</td>
                                 <td>{organization.orgtype}</td>
                                 <td>{organization.orgtypename}</td>
                                 <td>{organization.orgcatlog}</td>
                                 <td>{organization.baseorgcode}</td>
                                 <td>{organization.tenantid}</td>
                                 <td>
                                    <button  onClick={() => this.viewOrganization(organization.id)} className="btn btn-primary">查看组织详情</button>
                                 </td>
                             </tr>
                         )
                     }
                 </tbody>
            </table>
        </div>
        )
    }
}

export default OrganizationComponent