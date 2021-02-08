import React from 'react'
import OrganizationService from '../Service/OrganizationService';
import TenantService from '../Service/TenantService';

class AddOrganizationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            orgname:'',
            orgnameformat:'',
            tenantid:'',
            tenants:[]
        }
        this.changeOrgnameHandler=this.changeOrgnameHandler.bind(this);
        this.saveOrganzation=this.saveOrganzation.bind(this);
    }

    componentDidMount(){
        TenantService.findAllTenant().then(res=>{
            this.setState({tenants:res.data});
        })
    }

    changeOrgnameHandler=(event) =>{
        this.setState({orgname: event.target.value});
    }
    changeTenantidHandler=(event)=>{
        this.setState({tenantid:event.target.value});
    }

    saveOrganzation = (o) => {
        this.setState({orgnameformat:''});
        o.preventDefault();
        let organization = {id:'',orgname:this.state.orgname,parentorgid:'',
        orglevel:'',orgtype:'',orgtypename:'',orgcatlog:'',
        baseorgcode:'',tenantid:this.state.tenantid,updatetime:'',createtime:'',
        isdeleted:0,fullparentid:'',ishavechild:''};
        OrganizationService.addOrganization(organization).then(res => {
            this.props.history.push("/organizationlist");
        }).catch(err=>{
            if(this.state.orgname.length>64){
                this.setState({orgnameformat:"组织名称过长..."});
            }
        })
    }

    cancel(){
        this.props.history.push("/organizationlist");
    }
    render(){
        return(
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop:"10%"}}>
                        <br></br>
                         <h3 className="text-center text-secondary font-weight-bold">添加新组织</h3>
                         <div className="card-body">
                         <form>
                         <div className="form-group">
                            <label className="text-secondary font-weight-bold">组织名称:</label>
                            <input placeholder="请输入组织名称..." className="form-control" value={this.state.orgname} onChange={this.changeOrgnameHandler}/>
                            <div style={{color:"#f44e3b"}}>{this.state.orgnameformat}</div>
                        </div>
                        <div className="form-group">
                            <label className="text-secondary font-weight-bold">租户:</label>
                            <select className="form-control font-weight-bold text-secondary" value={this.state.tenantid} onChange={this.changeTenantidHandler}>
                                <option defaultValue value=''>请选择租户</option>
                                {
                                    this.state.tenants.map(
                                        tenant =>
                                        <option value={tenant.id}>{tenant.name}</option>
                                    )
                                }
                            </select>
                        </div>
                                 <button className="btn btn-success" onClick={this.saveOrganzation}>保存</button>
                                 <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                             </form>
                         </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default AddOrganizationComponent