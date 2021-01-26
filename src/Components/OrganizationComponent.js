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
            <h1 className="text-center">公司列表</h1>
            <button className="btn btn-primary" onClick={this.addOrganization}>添加公司</button>
            <div className="row">
            </div>
            <table className="table table-striped table-boarder"> 
               <thead>
                    <tr>
                      <th>id</th>  
                      <th>公司名称</th>     
                      <th>公司等级</th>  
                      <th>公司类别</th>  
                      <th>公司类别名称</th> 
                      <th>org_catlog</th>  
                      <th>base_org_code</th>  
                      <th>租户id</th>  
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
                                    <button  onClick={() => this.viewOrganization(organization.id)} className="btn btn-primary">查看公司详情</button>
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