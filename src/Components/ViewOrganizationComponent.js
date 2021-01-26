import React from 'react'
import OrganizationService from '../Service/OrganizationService'

class ViewOrganizationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            organization:{}
        }
    }

    componentDidMount(){
        OrganizationService.findById(this.state.id).then(res => {
            this.setState({organization:res.data});
        })
    }
    
    render(){
        return(
            <div>
                <br></br>
              <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">公司详情</h3>
                <div className="card-body">
                    <div className="row">
                        <label>id:</label>
                        <div>{this.state.organization.id}</div>
                    </div>
                    <div className="row">
                        <label>公司名称:</label>
                        <div>{this.state.organization.orgname}</div>
                    </div>
                    <div className="row">
                        <label>母公司id:</label>
                        <div>{this.state.organization.parentorgid}</div>
                    </div>
                    <div className="row">
                        <label>公司等级:</label>
                        <div>{this.state.organization.orglevel}</div>
                    </div>
                    <div className="row">
                        <label>公司类别:</label>
                        <div>{this.state.organization.orgtype}</div>
                    </div>
                    <div className="row">
                        <label>公司类别名称:</label>
                        <div>{this.state.organization.orgtypename}</div>
                    </div>
                    <div className="row">
                        <label>org_catlog:</label>
                        <div>{this.state.organization.orgcatlog}</div>
                    </div>
                    <div className="row">
                        <label>base_org_code:</label>
                        <div>{this.state.organization.baseorgcode}</div>
                    </div>
                    <div className="row">
                        <label>租户id:</label>
                        <div>{this.state.organization.tenantid}</div>
                    </div>
                    <div className="row">
                        <label>更新时间:</label>
                        <div>{this.state.organization.updatetime}</div>
                    </div>
                    <div className="row">
                        <label>创建时间:</label>
                        <div>{this.state.organization.createtime}</div>
                    </div>
                    <div className="row">
                        <label>是否删除:</label>
                        <div>{this.state.organization.isdeleted}</div>
                    </div>
                    <div className="row">
                        <label>完整母公司id:</label>
                        <div>{this.state.organization.fullparentid}</div>
                    </div>
                    <div className="row">
                        <label>是否有子公司:</label>
                    <div>{this.state.organization.ishavechild}</div>
                    </div>
                </div>
              </div>
            </div>
        )
    }
}

export default ViewOrganizationComponent