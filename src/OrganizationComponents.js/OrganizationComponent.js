import React from 'react'
import OrganizationService from '../Service/OrganizationService';

class OrganizationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pageNo:1,
            organizations:[]
        }
        this.firstPage=this.firstPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.addOrganization=this.addOrganization.bind(this);
        this.viewOrganization=this.viewOrganization.bind(this);
        this.editOrganization=this.editOrganization.bind(this);
        this.deleteOrganization=this.deleteOrganization.bind(this);
        this.findAllOrganization=this.findAllOrganization.bind(this);
    }

    componentDidMount(){
            this.findAllOrganization(this.state.pageNo);
    }

    findAllOrganization(p){
        OrganizationService.findAllOrganizationPaginated(p).then(res=>{
            this.setState({organizations:res.data.content});
        });
        OrganizationService.count().then(res=>{
            this.setState({totalElements:res.data});
        });
        OrganizationService.page().then(res=>{
            this.setState({totalPages:res.data});
        });
        this.setState({pageNo:p});
    }

    firstPage=()=>{
        this.findAllOrganization(1);
    }

    lastPage=()=>{
        this.findAllOrganization(this.state.totalPages);
    }

    pageUp=()=>{
        this.findAllOrganization(this.state.pageNo+1);
    }

    pageDown=()=>{
        this.findAllOrganization(this.state.pageNo-1);
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
            if(this.state.pageNo === this.state.totalPages && this.state.pageNo>1){
                if(this.state.organizations.length === 1){
                    this.findAllOrganization(this.state.pageNo-1);
                }else{
                    this.findAllOrganization(this.state.pageNo);
                }
            }else{
                this.findAllOrganization(this.state.pageNo);
            }
        });
    }

    render(){
        return(
            <div>
            <br></br>
            <h3 className="text-center font-weight-bold text-secondary">组织列表</h3>
            <button className="btn blue-btn btn-sm font-weight-bold text-white" onClick={this.addOrganization}>添加组织</button>
            <div className="row">
            </div>
            <table className="table table-boarder f-size"> 
               <thead>
                    <tr>
                      <th className="text-secondary" style={{columnWidth:"30px"}}>id</th>  
                      <th className="text-secondary" style={{columnWidth:"100px"}}>组织名称</th>     
                      <th className="text-secondary" style={{columnWidth:"80px"}}>组织层级</th>  
                      <th className="text-secondary" style={{columnWidth:"100px"}}>组织类型ID</th>  
                      <th className="text-secondary" style={{columnWidth:"140px"}}>组织类型名称</th> 
                      <th className="text-secondary" style={{columnWidth:"80px"}}>组织种类</th>  
                      <th className="text-secondary" style={{columnWidth:"110px"}}>基准组织编码</th>  
                      <th className="text-secondary" style={{columnWidth:"60px"}}>租户ID</th>  
                      <th className="text-secondary text-center" style={{columnWidth:"300px"}}>操作</th>
                    </tr>
                    </thead>
                 <tbody>
                     {
                         this.state.organizations.map(
                             organization =>
                             <tr key= {organization.id}>
                                 <td className="t-cell" style={{maxWidth:"30px"}}>{organization.id}</td>
                                 <td className="t-cell" style={{maxWidth:"100px"}}>{organization.orgname}</td>
                                 <td className="t-cell" style={{maxWidth:"80px"}}>{organization.orglevel}</td>
                                 <td className="t-cell" style={{maxWidth:"100px"}}>{organization.orgtype}</td>
                                 <td className="t-cell" style={{maxWidth:"140px"}}>{organization.orgtypename}</td>
                                 <td className="t-cell" style={{maxWidth:"80px"}}>{organization.orgcatlog}</td>
                                 <td className="t-cell" style={{maxWidth:"110px"}}>{organization.baseorgcode}</td>
                                 <td className="t-cell" style={{maxWidth:"60px"}}>{organization.tenantid}</td>
                                 <td className="t-cell text-center" style={{maxWidth:"300px"}}>
                                    <button  onClick={() => this.viewOrganization(organization.id)} className="btn btn-sm yellow-btn font-weight-bold text-white">查看详情</button>
                                    <button  onClick={() => this.editOrganization(organization.id)} className="btn btn-sm green-btn font-weight-bold text-white" style={{marginLeft:"10px"}}>编辑资料</button>
                                    <button  onClick={() => this.deleteOrganization(organization.id)} className="btn btn-sm red-btn font-weight-bold text-white" style={{marginLeft:"10px"}}>删除</button>
                                 </td>
                             </tr>
                         )
                     }
                 </tbody>
            </table>
            <div className="text-center">
            <button className="font-weight-bold btn btn-sm color-btn text-white" onClick={this.firstPage} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>first page</button>
            <button className="font-weight-bold btn btn-sm color-btn text-white" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>previous page</button>
            <button className="font-weight-bold btn btn-sm color-btn text-white" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
            <button className="font-weight-bold btn btn-sm color-btn text-white" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
            </div> 
            <div className="text-center font-weight-bold color-font" >{this.state.pageNo} of {this.state.totalPages} 页</div>
            <div className="text-center font-weight-bold color-font">共{this.state.totalElements}组织</div>
        </div>
        )
    }
}

export default OrganizationComponent