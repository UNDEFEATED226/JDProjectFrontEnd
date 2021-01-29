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
        this.saveOrganzation=this.saveOrganzation.bind(this);
    }
    changeOrgnameHandler=(event) =>{
        this.setState({orgname: event.target.value});
    }

    saveOrganzation = (o) => {
        this.setState({orgnameformat:''});
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