import React from 'react'
import OrganizationService from '../Service/OrganizationService'

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
            updatetime:'',
            createtime:'',
            isdeleted:'',
            fullparentid:'',
            fullparentidformat:'',
            ishavechild:''
        }
        this.changeOrgnameHandler=this.changeOrgnameHandler.bind(this);
        this.changeParentorgidHandler=this.changeParentorgidHandler.bind(this);
        this.changeOrglevelHandler=this.changeOrglevelHandler.bind(this);
        this.changeOrgtypeHandler=this.changeOrgtypeHandler.bind(this);
        this.changeOrgtypenameHandler=this.changeOrgtypenameHandler.bind(this);
        this.changeOrgcatlogHandler=this.changeOrgcatlogHandler.bind(this);
        this.changeBaseorgcodeHandler=this.changeBaseorgcodeHandler.bind(this);
        this.changeIsdeletedHandler=this.changeIsdeletedHandler.bind(this);
        this.changeFullparentidHandler=this.changeFullparentidHandler.bind(this);
        this.changeIshavechildHandler=this.changeIshavechildHandler.bind(this);
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
    changeIsdeletedHandler=(event)=>{
        this.setState({isdeleted:event.target.value});
    }
    changeFullparentidHandler=(event)=>{
        this.setState({fullparentid:event.target.value});
    }
    changeIshavechildHandler=(event)=>{
        this.setState({ishavechild:event.target.value});
    }
    cancel(){
        this.props.history.push("/organizationlist");
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
        let organization= {id:this.state.id,orgname:this.state.orgname,parentorgid:this.state.parentorgid,
        orglevel:this.state.orglevel,orgtype:this.state.orgtype,orgtypename:this.state.orgtypename,orgcatlog:this.state.orgcatlog,
        baseorgcode:this.state.baseorgcode,tenantid:this.state.tenantid,updatetime:this.state.updatetime,createtime:this.state.createtime,
        isdeleted:this.state.isdeleted,fullparentid:this.state.fullparentid,ishavechild:this.state.ishavechild};
        OrganizationService.editOrganization(this.state.id,organization).then(res =>{
            this.props.history.push("/organizationlist");
        }).catch(err => {
            if(this.state.orgname.length>64){
                this.setState({orgnameformat:"组织名称过长..."});
            }
            if(this.state.parentorgid!=null && this.state.parentorgid !== '' && (isNaN(this.state.parentorgid)||this.state.parentorgid.length>11)){
                this.setState({parentorgidformat:"父级组织ID为至多11位纯数字..."});
            }
            if(this.state.orglevel!=null&&this.state.orglevel!==''&&(isNaN(this.state.orglevel)||this.state.orglevel.length>11)){
                this.setState({orglevelformat:"组织层级为至多11位纯数字..."});
            }
            if(this.state.orgtype!=null&&this.state.orgtype!==''&&(isNaN(this.state.orgtype)||this.state.orgtype.length>11)){
                this.setState({orgtypeformat:"组织类型ID为至多11位纯数字..."});
            }
            if(this.state.orgtypename!=null&&this.state.orgtypename!==''&&this.state.orgtypename.length>64){
                this.setState({orgtypenameformat:"组织类型名称过长..."});
            }
            if(this.state.orgcatlog!=null&&this.state.orgcatlog!==''&&(isNaN(this.state.orgcatlog)||this.state.orgcatlog.length>11)){
                this.setState({orgcatlogformat:"组织种类为至多11位纯数字..."});
            }
            if(this.state.baseorgcode!=null&&this.state.baseorgcode!==''&&this.state.baseorgcode.length>64){
                this.setState({baseorgcodeformat:"基准组织编码过长..."});
            }
            if(this.state.fullparentid!=null&&this.state.fullparentid!==''&&this.state.fullparentid.length>255){
                this.setState({fullparentidformat:"路径过长..."});
            }
        });
    }
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                    <h3 className="card-header text-center font-weight-bold text-secondary">编辑组织资料</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">组织名称:</label>
                                <input placeholder="请输入组织名称..."  className="form-control" value={this.state.orgname} onChange={this.changeOrgnameHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orgnameformat}</div>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">父级组织ID:</label>
                                <input placeholder="请输入父级组织ID..."  className="form-control" value={this.state.parentorgid} onChange={this.changeParentorgidHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.parentorgidformat}</div>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">组织层级:</label>
                                <input placeholder="请输入组织层级..."  className="form-control" value={this.state.orglevel} onChange={this.changeOrglevelHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orglevelformat}</div>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">组织类型ID:</label>
                                <input placeholder="请输入组织类型ID..."  className="form-control" value={this.state.orgtype} onChange={this.changeOrgtypeHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orgtypeformat}</div>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">组织类型名称:</label>
                                <input placeholder="请输入组织类型名称..."  className="form-control" value={this.state.orgtypename} onChange={this.changeOrgtypenameHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orgtypenameformat}</div>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">组织种类:</label>
                                <input placeholder="请输入组织种类..."  className="form-control" value={this.state.orgcatlog} onChange={this.changeOrgcatlogHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.orgcatlogformat}</div>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">基准组织编码:</label>
                                <input placeholder="请输入基准组织编码..."  className="form-control" value={this.state.baseorgcode} onChange={this.changeBaseorgcodeHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.baseorgcodeformat}</div>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">是否已删除:</label>
                                <select className="form-control" onChange={this.changeIsdeletedHandler}>
                                    <option defaultValue value={this.state.isdeleted}>请选择是否已删除</option>
                                    <option value="1">是</option>
                                    <option value="0">否</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">路径:</label>
                                <input placeholder="请输入路径..."  className="form-control" value={this.state.fullparentid} onChange={this.changeFullparentidHandler}/>
                                <div style={{color:"#f44e3b"}}>{this.state.fullparentidformat}</div>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary font-weight-bold">是否有子节点:</label>
                                <select className="form-control" onChange={this.changeIshavechildHandler}>
                                    <option defaultValue value={this.state.ishavechild}>请选择是否有子节点</option>
                                    <option value="1">是</option>
                                    <option value="0">否</option>
                                </select>
                            </div>
                            <div>
                                <button className="btn btn-outline-success" onClick={this.editOrganization}>保存</button>
                                <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditOrganizationComponent