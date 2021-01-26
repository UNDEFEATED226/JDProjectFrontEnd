import React from 'react'
import OrganizationService from '../Service/OrganizationService'

class ViewOrganizationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            organization:{},
            isdeleted:'',
            ishavechild:''
        }
    }

    componentDidMount(){
        OrganizationService.findById(this.state.id).then(res => {
            this.setState({organization:res.data});
            if(this.state.organization.isdeleted === 1){
                this.setState({isdeleted:"已删除"});
            }
            if(this.state.organization.isdeleted === 0){
                this.setState({isdeleted:"未删除"});
            }
            if(this.state.organization.ishavechild === 1){
                this.setState({ishavechild:"存在子节点"});
            }
            if(this.state.organization.ishavechild === 0){
                this.setState({ishavechild:"不存在子节点"});
            }
        })
    }
    
    render(){
        return(
            <div>
                <br></br>
              <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">组织详情</h3>
                <div className="card-body">
                    <div className="row">
                        <label>id:</label>
                        <div>{this.state.organization.id}</div>
                    </div>
                    <div className="row">
                        <label>组织名称:</label>
                        <div>{this.state.organization.orgname}</div>
                    </div>
                    <div className="row">
                        <label>父级组织ID:</label>
                        <div>{this.state.organization.parentorgid}</div>
                    </div>
                    <div className="row">
                        <label>组织层级:</label>
                        <div>{this.state.organization.orglevel}</div>
                    </div>
                    <div className="row">
                        <label>组织类型ID:</label>
                        <div>{this.state.organization.orgtype}</div>
                    </div>
                    <div className="row">
                        <label>组织类型名称:</label>
                        <div>{this.state.organization.orgtypename}</div>
                    </div>
                    <div className="row">
                        <label>组织种类:</label>
                        <div>{this.state.organization.orgcatlog}</div>
                    </div>
                    <div className="row">
                        <label>基准组织编码:</label>
                        <div>{this.state.organization.baseorgcode}</div>
                    </div>
                    <div className="row">
                        <label>租户ID:</label>
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
                        <label>是否已删除:</label>
                        <div>{this.state.isdeleted}</div>
                    </div>
                    <div className="row">
                        <label>路径:</label>
                        <div>{this.state.organization.fullparentid}</div>
                    </div>
                    <div className="row">
                        <label>是否有子节点:</label>
                    <div>{this.state.ishavechild}</div>
                    </div>
                </div>
              </div>
            </div>
        )
    }
}

export default ViewOrganizationComponent