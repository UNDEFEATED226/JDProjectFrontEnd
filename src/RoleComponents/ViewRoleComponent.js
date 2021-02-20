import React from 'react'
import moment from 'moment'
import RoleService from '../Service/RoleService'

class ViewRoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            roletype:'',
            isdeleted:'',
            isdefault:'',
            isforbidden:'',
            role:{}
        }
    }

    componentDidMount(){
        RoleService.findById(this.state.id).then(res => {
            this.setState({role:res.data});
            if(this.state.role.roletype===1){
                this.setState({roletype:"组织角色"});
            }
            if(this.state.role.roletype===2){
                this.setState({roletype:"业务角色"});
            }
            if(this.state.role.isdeleted===1){
                this.setState({isdeleted:"已删除"});
            }else{
                this.setState({isdeleted:"未删除"});
            }
            if(this.state.role.isdefault===1){
                this.setState({isdefault:"非默认角色"});
            }else{
                this.setState({isdefault:"默认角色"});
            }
            if(this.state.role.isforbidden===1){
                this.setState({isforbidden:"已禁用"});
            }else{
                this.setState({isforbidden:"未禁用"});
            }
        });
    }

    render(){
        return(
            <div style={{marginTop:"5%"}} className="text-secondary">
              <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                <h3 className="text-center font-weight-bold card-header">角色详情</h3>
                <div className="card-body">
                    <div className="row">
                        <label>ID:</label>
                        <div>{this.state.role.id}</div>
                    </div>
                    <div className="row">
                        <label>角色名称:</label>
                        <div>{this.state.role.rolename}</div>
                    </div>
                    <div className="row">
                        <label>角色类型:</label>
                        <div>{this.state.roletype}</div>
                    </div>
                    <div className="row">
                        <label>描述信息:</label>
                        <div>{this.state.role.description}</div>
                    </div>
                    <div className="row">
                        <label>租户ID:</label>
                        <div>{this.state.role.tenantid}</div>
                    </div>
                    <div className="row">
                        <label>是否已删除:</label>
                        <div>{this.state.isdeleted}</div>
                    </div>
                    <div className="row">
                        <label>是否为系统角色:</label>
                        <div>{this.state.role.issystem}</div>
                    </div>
                    <div className="row">
                        <label>创建时间:</label>
                        <div>{moment(this.state.role.createtime).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                    <div className="row">
                        <label>最后一次更新时间:</label>
                        <div>{moment(this.state.role.updatetime).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                    <div className="row">
                        <label>角色编码:</label>
                        <div>{this.state.role.rolecode}</div>
                    </div>
                    <div className="row">
                        <label>是否被禁用:</label>
                        <div>{this.state.isforbidden}</div>
                    </div>
                    <div className="row">
                        <label>是否默认角色:</label>
                        <div>{this.state.isdefault}</div>
                    </div>
                </div>
              </div>
              </div>
        )
    }
}

export default ViewRoleComponent