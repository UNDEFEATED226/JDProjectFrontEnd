import React from 'react'
import OrganizationService from '../Service/OrganizationService';

class AddOrganizationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:'',
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
        this.setState({orgnameformat:''});
        this.setState({orgtypenameformat:''});
        this.setState({parentorgidformat:''});
        this.setState({orglevelformat:''});
        this.setState({orgtypeformat:''});
        this.setState({orgcatlogformat:''});
        this.setState({baseorgcodeformat:''});
        this.setState({fullparentidformat:''});
        o.preventDefault();
        let organization = {id:this.state.id,orgname:this.state.orgname,parentorgid:this.state.parentorgid,
        orglevel:this.state.orglevel,orgtype:this.state.orgtype,orgtypename:this.state.orgtypename,orgcatlog:this.state.orgcatlog,
        baseorgcode:this.state.baseorgcode,tenantid:this.state.tenantid,updatetime:this.state.updatetime,createtime:this.state.createtime,
        isdeleted:this.state.isdeleted,fullparentid:this.state.fullparentid,ishavechild:this.state.ishavechild};
        OrganizationService.addOrganization(organization).then(res => {
            this.props.history.push("/organizationlist");
        }).catch(err=>{
            if(this.state.orgname === '' || this.state.orgname.length>64){
                this.setState({orgnameformat:"组织名称为空或组织名称过长..."});
            }
            if(this.state.orgtypename.length>64){
                this.setState({orgtypenameformat:"组织类型名称过长..."});
            }
            if(this.state.baseorgcode.length>64){
                this.setState({baseorgcodeformat:"基准组织编码过长..."});
            }
            if(this.state.fullparentid.length>255){
                this.setState({fullparentidformat:"路径过长..."});
            }
            if(isNaN(this.state.parentorgid)||this.state.parentorgid.toString.length>11){
                this.setState({parentorgidformat:"请输入至多11位纯数字"});
            }
            if(isNaN(this.state.orglevel)||this.state.orglevel.toString.length>11){
                this.setState({orglevelformat:"请输入至多11位纯数字"});
            }
            if(isNaN(this.state.orgtype)||this.state.orgtype.toString.length>11){
                this.setState({orgtypeformat:"请输入至多11位纯数字"});
            }
            if(isNaN(this.state.orgcatlog)||this.state.orgcatlog.toString.length>11){
                this.setState({orgcatlogformat:"请输入至多11位纯数字"});
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
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                         <h3 className="text-center">添加新组织</h3>
                         <div className="card-body">
                         <form>
                         <div className="form-group">
                        <label>组织名称:</label>
                        <input placeholder="请输入组织名称..." className="form-control" value={this.state.orgname} onChange={this.changeOrgnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.orgnameformat}</div>
                    </div>
                    <div className="form-group">
                        <label>父级组织ID:</label>
                        <input placeholder="请输入父级组织ID..." className="form-control" value={this.state.parentorgid} onChange={this.changeParentorgidHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.parentorgidformat}</div>
                    </div>
                    <div className="form-group">
                        <label>组织层级:</label>
                        <input placeholder="请输入组织层级..." className="form-control" value={this.state.orglevel} onChange={this.changeOrglevelHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.orglevelformat}</div>
                    </div>
                    <div className="form-group">
                        <label>组织类型ID:</label>
                        <input placeholder="请输入组织类型ID..." className="form-control" value={this.state.orgtype} onChange={this.changeOrgtypeHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.orgtypeformat}</div>
                    </div>
                    <div className="form-group">
                        <label>组织类型名称:</label>
                        <input placeholder="请输入组织类型名称..." className="form-control" value={this.state.orgtypename} onChange={this.changeOrgtypenameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.orgtypenameformat}</div>
                    </div>
                    <div className="form-group">
                        <label>组织种类</label>
                        <input placeholder="请输入组织种类..." className="form-control" value={this.state.orgcatlog} onChange={this.changeOrgcatlogHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.orgcatlogformat}</div>
                    </div>
                    <div className="form-group">
                        <label>基准组织编码:</label>
                        <input placeholder="请输入基准组织编码..." className="form-control" value={this.state.baseorgcode} onChange={this.changeBaseorgcodeHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.baseorgcodeformat}</div>
                    </div>
                    <div className="form-group">
                        <label>是否已删除:</label>
                        <select className="form-control" onClick={this.changeIsdeletedHandler}>
                            <option defaultValue value="0">否</option>
                            <option value="1">是</option>                          
                        </select>
                        
                    </div>
                    <div className="form-group">
                        <label>路径:</label>
                        <input placeholder="请输入路径..." className="form-control" value={this.state.fullparentid} onChange={this.changeFullparentidHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.fullparentidformat}</div>
                    </div>
                    <div className="form-group">
                        <label>是否有子节点:</label>
                        <select className="form-control" onClick={this.changeIshavechildHandler}>
                            <option defaultValue value=''>请选择是否有子节点</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
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