import React from 'react'
import OrganizationService from '../Service/OrganizationService'
import TenantService from '../Service/TenantService'

class EditOrganizationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            orgname:'',
            orgnameformat:'',
            parentorgid:'',
            parentorgidformat:'',
            orglevel:'',
            orglevelformat:'',
            orgtype:'',
            orgtypeformat:'',
            orgtypename:'',
            orgtypenameformat:'',
            orgcatlog:'',
            orgcatlogformat:'',
            baseorgcode:'',
            baseorgcodeformat:'',
            tenantid:'',
            tenantidformat:'',
            updatetime:'',
            createtime:'',
            isdeleted:'',
            fullparentid:'',
            fullparentidformat:'',
            ishavechild:'',
            tenants:[],
            organizations:[]
        }
        this.changeOrgnameHandler=this.changeOrgnameHandler.bind(this);
        this.changeParentorgidHandler=this.changeParentorgidHandler.bind(this);
        this.changeOrglevelHandler=this.changeOrglevelHandler.bind(this);
        this.changeOrgtypeHandler=this.changeOrgtypeHandler.bind(this);
        this.changeOrgtypenameHandler=this.changeOrgtypenameHandler.bind(this);
        this.changeOrgcatlogHandler=this.changeOrgcatlogHandler.bind(this);
        this.changeBaseorgcodeHandler=this.changeBaseorgcodeHandler.bind(this);
        this.changeFullparentidHandler=this.changeFullparentidHandler.bind(this);
        this.changeIshavechildHandler=this.changeIshavechildHandler.bind(this);
        this.changeTenantidHandler = this.changeTenantidHandler.bind(this);
        this.editOrganization=this.editOrganization.bind(this)
    }

    componentDidMount(){
        OrganizationService.findById(this.state.id).then(res =>{
            let organization=res.data;
            this.setState({
                orgname:organization.orgname,
                parentorgid:organization.parentorgid,
                orglevel:organization.orglevel,
                orgtype:organization.orgtype,
                orgtypename:organization.orgtypename,
                orgcatlog:organization.orgcatlog,
                baseorgcode:organization.baseorgcode,
                tenantid:organization.tenantid,
                updatetime:organization.updatetime,
                createtime:organization.createtime,
                isdeleted:organization.isdeleted,
                fullparentid:organization.fullparentid,
                ishavechild:organization.ishavechild
            });
            OrganizationService.findAllOrganization().then(res=>{
                this.setState({organizations:res.data});
            });
        });
        TenantService.findAllTenant().then(res=>{
            this.setState({tenants:res.data});
        });
    }

    changeOrgnameHandler=(event)=>{
        this.setState({orgname:event.target.value});
    }
    changeParentorgidHandler=(event)=>{
        this.setState({parentorgid:event.target.value});
    }
    changeOrglevelHandler=(event)=>{
        this.setState({orglevel:event.target.value});
    }
    changeOrgtypeHandler=(event)=>{
        this.setState({orgtype:event.target.value});
    }
    changeOrgtypenameHandler=(event)=>{
        this.setState({orgtypename:event.target.value});
    }
    changeOrgcatlogHandler=(event)=>{
        this.setState({orgcatlog:event.target.value});
    }
    changeBaseorgcodeHandler=(event)=>{
        this.setState({baseorgcode:event.target.value});
    }
    changeFullparentidHandler=(event)=>{
        this.setState({fullparentid:event.target.value});
    }
    changeIshavechildHandler=(event)=>{
        this.setState({ishavechild:event.target.value});
    }
    changeTenantidHandler=(event)=>{
        this.setState({tenantid:event.target.value});
    }
    cancel(){
       this.props.history.goBack();
    }
    editOrganization=(o)=>{
        o.preventDefault();
        this.setState({
            orgnameformat:'',
            parentorgidformat:'',
            orglevelformat:'',
            orgtypeformat:'',
            orgtypenameformat:'',
            orgcatlogformat:'',
            baseorgcodeformat:'',
            fullparentidformat:''
        });
        var bool = false;
        if(this.state.orgname.trim() === ''){
            bool = true;
            this.setState({orgnameformat:'????????????????????????...'});
        }
        if(this.state.tenantid == null || this.state.tenantid === ''){
            bool = true; 
            this.setState({tenantidformat:"???????????????..."});
        }
        if(bool){
            throw new Error('INPUT ERROR');
        }
        let organization= {id:this.state.id,orgname:this.state.orgname,parentorgid:this.state.parentorgid,
        orglevel:this.state.orglevel,orgtype:this.state.orgtype,orgtypename:this.state.orgtypename,orgcatlog:this.state.orgcatlog,
        baseorgcode:this.state.baseorgcode,tenantid:this.state.tenantid,updatetime:this.state.updatetime,createtime:this.state.createtime,
        isdeleted:this.state.isdeleted,fullparentid:this.state.fullparentid,ishavechild:this.state.ishavechild};
        OrganizationService.editOrganization(this.state.id,organization).then(res =>{
            this.props.history.push("/organizationlist");
        }).catch(err => {
            if(this.state.orgname.length>64){
                this.setState({orgnameformat:"??????????????????..."});
            }
            if(this.state.parentorgid!=null && this.state.parentorgid !== '' && (isNaN(this.state.parentorgid)||this.state.parentorgid.length>11)){
                this.setState({parentorgidformat:"????????????ID?????????11????????????..."});
            }
            if(this.state.orglevel!=null&&this.state.orglevel!==''&&(isNaN(this.state.orglevel)||this.state.orglevel.length>11)){
                this.setState({orglevelformat:"?????????????????????11????????????..."});
            }
            if(this.state.orgtype!=null&&this.state.orgtype!==''&&(isNaN(this.state.orgtype)||this.state.orgtype.length>11)){
                this.setState({orgtypeformat:"????????????ID?????????11????????????..."});
            }
            if(this.state.orgtypename!=null&&this.state.orgtypename!==''&&this.state.orgtypename.length>64){
                this.setState({orgtypenameformat:"????????????????????????..."});
            }
            if(this.state.orgcatlog!=null&&this.state.orgcatlog!==''&&(isNaN(this.state.orgcatlog)||this.state.orgcatlog.length>11)){
                this.setState({orgcatlogformat:"?????????????????????11????????????..."});
            }
            if(this.state.baseorgcode!=null&&this.state.baseorgcode!==''&&this.state.baseorgcode.length>64){
                this.setState({baseorgcodeformat:"????????????????????????..."});
            }
            if(this.state.fullparentid!=null&&this.state.fullparentid!==''&&this.state.fullparentid.length>255){
                this.setState({fullparentidformat:"????????????..."});
            }
        });
    }
    render(){
        return(
            <div style={{marginTop:"5%",fontSize:"12px",fontFamily:"Sans-Serif",color:"#666669"}}>
                <div className="card bg-light mx-auto" style={{width:"30rem"}}>
                    <h5 className="card-header text-center ">??????????????????</h5>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>*????????????:</label>
                                <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.orgname} onChange={this.changeOrgnameHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orgnameformat}</div>
                            </div>
                            <div className="form-group">
                                <label>*??????:</label>
                                <select className="form-control" value={this.state.tenantid} style={{fontSize:"12px",color:"#666669"}} onChange={this.changeTenantidHandler}>
                                    <option value=''>???????????????...</option>
                                    {
                                        this.state.tenants.map(
                                            tenant => 
                                            <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                                        )
                                    }
                                </select>
                                <div style={{color:"#f44e3b"}}>{this.state.tenantidformat}</div>
                            </div>
                            <div className="form-group">
                                <label>????????????ID:</label>
                                <select className="form-control"  style={{fontSize:"12px"}} value={this.state.parentorgid} onChange={this.changeParentorgidHandler}>
                                    <option value=''>?????????????????????...</option>
                                    {
                                        this.state.organizations.map(
                                            org =>
                                            <option value={org.id}>{org.orgname}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>????????????:</label>
                                <input placeholder="?????????????????????..." style={{fontSize:"12px"}}  className="form-control" value={this.state.orglevel} onChange={this.changeOrglevelHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orglevelformat}</div>
                            </div>
                            <div className="form-group">
                                <label>????????????ID:</label>
                                <input placeholder="?????????????????????ID..." style={{fontSize:"12px"}}  className="form-control" value={this.state.orgtype} onChange={this.changeOrgtypeHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orgtypeformat}</div>
                            </div>
                            <div className="form-group">
                                <label>??????????????????:</label>
                                <input placeholder="???????????????????????????..." style={{fontSize:"12px"}}  className="form-control" value={this.state.orgtypename} onChange={this.changeOrgtypenameHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orgtypenameformat}</div>
                            </div>
                            <div className="form-group">
                                <label>????????????:</label>
                                <input placeholder="?????????????????????..." style={{fontSize:"12px"}}  className="form-control" value={this.state.orgcatlog} onChange={this.changeOrgcatlogHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orgcatlogformat}</div>
                            </div>
                            <div className="form-group">
                                <label>??????????????????:</label>
                                <input placeholder="???????????????????????????..." style={{fontSize:"12px"}}  className="form-control" value={this.state.baseorgcode} onChange={this.changeBaseorgcodeHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.baseorgcodeformat}</div>
                            </div>
                            <div className="form-group">
                                <label>??????:</label>
                                <input placeholder="???????????????..." style={{fontSize:"12px"}}  className="form-control" value={this.state.fullparentid} onChange={this.changeFullparentidHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.fullparentidformat}</div>
                            </div>
                            <div className="form-group">
                                <label>??????????????????:</label>
                                <select className="form-control" style={{fontSize:"12px",color:"#666669"}} value={this.state.ishavechild} onChange={this.changeIshavechildHandler}>
                                    <option value=''>???????????????????????????...</option>
                                    <option value="1">???</option>
                                    <option value="0">???</option>
                                </select>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-sm btn-outline-success" onClick={this.editOrganization}>??????</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>??????</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditOrganizationComponent