import React from 'react'
import moment from 'moment'
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
        });
    }
    
    render(){
        return(
            <div className="text-secondary" style={{marginTop:"2.5%",fontSize:"15px"}}>
                  <button className="btn text-white font-weight-bold" onClick={e=>{this.props.history.push('/organizationlist')}} style={{marginLeft:'28.5%',backgroundColor:"purple"}}>返回</button>
              <div className="card bg-light mx-auto" style={{width:"30rem",marginTop:'2.5%'}}>
                <h5 className="text-center font-weight-bold card-header">组织详情</h5>
                <div className="card-body" style={{marginLeft:"5%"}}>
                    <div className="row">
                        <label>ID:</label>
                        <div>{this.state.organization.id}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>组织名称:</label>
                        <div>{this.state.organization.orgname}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>父级组织ID:</label>
                        <div>{this.state.organization.parentorgid}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>组织层级:</label>
                        <div>{this.state.organization.orglevel}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>组织类型ID:</label>
                        <div>{this.state.organization.orgtype}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>组织类型名称:</label>
                        <div>{this.state.organization.orgtypename}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>组织种类:</label>
                        <div>{this.state.organization.orgcatlog}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>基准组织编码:</label>
                        <div>{this.state.organization.baseorgcode}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>租户ID:</label>
                        <div>{this.state.organization.tenantid}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>租户名称:</label>
                        <div>{this.state.organization.tenantname}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>更新时间:</label>
                        <div>{moment(this.state.organization.updatetime).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>创建时间:</label>
                        <div>{moment(this.state.organization.createtime).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>路径:</label>
                        <div>{this.state.organization.fullparentid}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
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