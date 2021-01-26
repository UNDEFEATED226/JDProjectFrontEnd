import React from 'react'
import OrganizationService from '../Service/OrganizationService';

class AddOrganizationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:'',
            orgname:'',
            parentorgid:'',
            orglevel:'',
            orgtype:'',
            orgtypename:'',
            orgcatlog:'',
            baseorgcode:'',
            tenantid:'',
            updatetime:'',
            createtime:'',
            isdeleted:'',
            fullparentid:'',
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
        this.saveOrganzation=this.saveOrganzation.bind(this);
    }
    changeOrgnameHandler=(event) =>{
        this.setState({orgname: event.target.value});
    }
    changeParentorgidHandler=(event) =>{
        this.setState({parentorgid: event.target.value});
    }
    changeOrglevelHandler=(event) =>{
        this.setState({orglevel: event.target.value});
    }
    changeOrgtypeHandler=(event) =>{
        this.setState({orgtype: event.target.value});
    }
    changeOrgtypenameHandler=(event) =>{
        this.setState({orgtypename: event.target.value});
    }
    changeOrgcatlogHandler=(event) =>{
        this.setState({orgcatlog: event.target.value});
    }
    changeBaseorgcodeHandler=(event) =>{
        this.setState({baseorgcode: event.target.value});
    }
    changeIsdeletedHandler=(event) =>{
        this.setState({isdeleted: event.target.value});
    }
    changeFullparentidHandler=(event) =>{
        this.setState({fullparentid: event.target.value});
    }
    changeIshavechildHandler=(event) =>{
        this.setState({ishavechild: event.target.value});
    }

    saveOrganzation = (o) => {
        o.preventDefault();
        let organization = {id:this.state.id,orgname:this.state.orgname,parentorgid:this.state.parentorgid,
        orglevel:this.state.orglevel,orgtype:this.state.orgtype,orgtypename:this.state.orgtypename,orgcatlog:this.state.orgcatlog,
        baseorgcode:this.state.baseorgcode,tenantid:this.state.tenantid,updatetime:this.state.updatetime,createtime:this.state.createtime,
        isdeleted:this.state.isdeleted,fullparentid:this.state.fullparentid,ishavechild:this.state.ishavechild};
        OrganizationService.addOrganization(organization).then(res => {
            this.props.history.push("/organizationlist");
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
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                         <h3 className="text-center">添加新公司</h3>
                         <div className="card-body">
                         <form>
                         <div className="form-group">
                        <label>公司名称:</label>
                        <input placeholder="请输入公司名称..." className="form-control" value={this.state.orgname} onChange={this.changeOrgnameHandler}/>
                    </div>
                    <div className="form-group">
                        <label>母公司id:</label>
                        <input placeholder="请输入母公司id..." className="form-control" value={this.state.parentorgid} onChange={this.changeParentorgidHandler}/>
                    </div>
                    <div className="form-group">
                        <label>公司等级:</label>
                        <input placeholder="请输入公司等级..." className="form-control" value={this.state.orglevel} onChange={this.changeOrglevelHandler}/>
                    </div>
                    <div className="form-group">
                        <label>公司类别:</label>
                        <input placeholder="请输入公司类别..." className="form-control" value={this.state.orgtype} onChange={this.changeOrgtypeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>公司类别名称:</label>
                        <input placeholder="请输入公司类别名称..." className="form-control" value={this.state.orgtypename} onChange={this.changeOrgtypenameHandler}/>
                    </div>
                    <div className="form-group">
                        <label>org_catlog</label>
                        <input placeholder="请输入org_catlog..." className="form-control" value={this.state.orgcatlog} onChange={this.changeOrgcatlogHandler}/>
                    </div>
                    <div className="form-group">
                        <label>base_org_code:</label>
                        <input placeholder="请输入base_org_code..." className="form-control" value={this.state.baseorgcode} onChange={this.changeBaseorgcodeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>是否删除:</label>
                        <input placeholder="请输入是否删除..." className="form-control" value={this.state.isdeleted} onChange={this.changeIsdeletedHandler}/>
                    </div>
                    <div className="form-group">
                        <label>完整母公司id:</label>
                        <input placeholder="请输入完整母公司id..." className="form-control" value={this.state.fullparentid} onChange={this.changeFullparentidHandler}/>
                    </div>
                    <div className="form-group">
                        <label>是否有子公司:</label>
                        <input placeholder="请输入是否有子公司..." className="form-control" value={this.state.ishavechild} onChange={this.changeIshavechildHandler}/>
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