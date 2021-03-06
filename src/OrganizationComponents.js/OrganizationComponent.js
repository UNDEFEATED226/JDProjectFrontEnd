import React from 'react'
import moment from 'moment'
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
            <h3 className="text-center" style={{color:"#666669",marginTop:"3.5%"}}>????????????</h3>
            <button className="btn btn-sm btn-outline-primary" onClick={this.addOrganization}>????????????</button>
            <div className="row">
            </div>
            <table className="table table-boarder f-size" style={{color:"#666669",fontFamily:'Sans-Serif'}}> 
               <thead>
                    <tr>
                      <th style={{columnWidth:"30px"}}>id</th>  
                      <th style={{columnWidth:"200px"}}>????????????</th>     
                      <th style={{columnWidth:"200px"}}>????????????</th>  
                      <th style={{columnWidth:"190px"}}>????????????</th>  
                      <th style={{columnWidth:"190px"}}>????????????</th>  
                      <th className="text-center" style={{columnWidth:"300px"}}>??????</th>
                    </tr>
                    </thead>
                 <tbody>
                     {
                         this.state.organizations.map(
                             organization =>
                             <tr key= {organization.id}>
                                 <td className="t-cell" style={{maxWidth:"30px"}} data-toggle='tooltip' title={organization.id}>{organization.id}</td>
                                 <td className="t-cell" style={{maxWidth:"200px"}} data-toggle='tooltip' title={organization.orgname}>{organization.orgname}</td>
                                 <td className="t-cell" style={{maxWidth:"200px",color:organization.tenantname ==='???????????????????????????' ? 'red':undefined}} data-toggle='tooltip' title={organization.tenantname}>{organization.tenantname}</td>
                                 <td className="t-cell" style={{maxWidth:"190px"}} data-toggle='tooltip' title={organization.createtime}>{moment(organization.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                                 <td className="t-cell" style={{maxWidth:"190px"}} data-toggle='tooltip' title={organization.updatetime}>{moment(organization.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                                 <td className="t-cell text-center" style={{maxWidth:"300px"}}>
                                    <button  onClick={() => this.viewOrganization(organization.id)} className="btn btn-sm btn-outline-info">??????????</button>
                                    <button  onClick={() => this.editOrganization(organization.id)} className="btn btn-sm btn-outline-success" style={{marginLeft:"10px"}}>?????????????</button>
                                    <button  onClick={() => {if(window.confirm('??????????????????????')){this.deleteOrganization(organization.id)}}} className="btn btn-sm btn-outline-danger" style={{marginLeft:"10px"}}>?????????????</button>
                                 </td>
                             </tr>
                         )
                     }
                 </tbody>
            </table>
            <div className="text-center">
            <button className="btn btn-sm btn-outline-dark" onClick={this.firstPage} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>first page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>previous page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo==null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
            </div> 
            <div className="text-center" style={{marginTop:"10px",fontSize:"12px",color:"#666669"}}>
            <div>{this.state.pageNo} of {this.state.totalPages} ???</div>
            <div>???{this.state.totalElements}??????</div>
            </div>
        </div>
        )
    }
}

export default OrganizationComponent