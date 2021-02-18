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
        this.editOrganization=this.editOrganization.bind(this);
        this.deleteOrganization=this.deleteOrganization.bind(this);
    }

    componentDidMount(){
        OrganizationService.findAllOrganization().then((response) => {
            this.setState({organizations:response.data})
        });
    }

    addOrganization(){
        this.props.history.push("/addorganization");
    }

    editOrganization(id){
        this.props.history.push(`/editorganization/${id}`)
    }

    viewOrganization(id){
        this.props.history.push(`/vieworganization/${id}`);
    }

    deleteOrganization(id){
        OrganizationService.deleteOrganization(id).then(res=>{
            this.setState({organizations:this.state.organizations.filter(organization => organization.id!==id)});
        })
    }

    render(){
        return(
            <div>
            <br></br>
            <h1 className="text-center font-weight-bold text-secondary">组织列表</h1>
            <button className="btn btn-primary text-white btn-lg font-weight-bold" onClick={this.addOrganization}>添加组织</button>
            <div className="row">
            </div>
            <table className="table table-striped table-boarder"> 
               <thead>
                    <tr>
                      <th className="text-secondary">id</th>  
                      <th className="text-secondary">组织名称</th>     
                      <th className="text-secondary">组织层级</th>  
                      <th className="text-secondary">组织类型ID</th>  
                      <th className="text-secondary">组织类型名称</th> 
                      <th className="text-secondary">组织种类</th>  
                      <th className="text-secondary">基准组织编码</th>  
                      <th className="text-secondary">租户ID</th>  
                      <th className="text-secondary">操作</th>
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
                                    <button  onClick={() => this.viewOrganization(organization.id)} className="btn btn-info font-weight-bold">查看详情</button>
                                    <button  onClick={() => this.editOrganization(organization.id)} className="btn btn-success font-weight-bold" style={{marginLeft:"10px"}}>编辑资料</button>
                                    <button  onClick={() => this.deleteOrganization(organization.id)} className="btn btn-danger font-weight-bold" style={{marginLeft:"10px"}}>删除</button>
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