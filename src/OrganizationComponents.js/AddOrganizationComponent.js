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
        o.preventDefault();
        this.setState({orgnameformat:''});
        if(this.state.orgname.trim() === ''){
            this.setState({orgnameformat:'组织名称不能为空...'});
            throw new Error('EMPTY ORG NAME');
        }
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
            <div style={{marginTop:"5%"}}>
                    <div className="card mx-auto bg-light f-size" style={{width:"30rem"}}>            
                         <h5 className="card-header text-center text-secondary font-weight-bold">添加新组织</h5>
                         <div className="card-body">
                         <form>
                         <div className="form-group">
                            <label className="text-secondary font-weight-bold">组织名称:</label>
                            <input placeholder="请输入组织名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.orgname} onChange={this.changeOrgnameHandler}/>
                            <div style={{color:"#f44e3b"}}>{this.state.orgnameformat}</div>
                        </div>
                        <div className="form-group">
                            <label className="text-secondary font-weight-bold">租户:</label>
                            <select className="form-control text-secondary" style={{fontSize:"12px"}} value={this.state.tenantid} onChange={this.changeTenantidHandler}>
                                <option defaultValue value=''>请选择租户</option>
                                {
                                    this.state.tenants.map(
                                        tenant =>
                                        <option value={tenant.id}>{tenant.name}</option>
                                    )
                                }
                            </select>
                            </div>
                                 <div className="text-center">
                                 <button className="btn btn-sm font-weight-bold text-white green-btn" onClick={this.saveOrganzation}>保存</button>
                                 <button className="btn btn-sm font-weight-bold text-white red-btn" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                                 </div>
                             </form>
                         </div>
                    </div>
                </div>
        )
    }
}

export default AddOrganizationComponent