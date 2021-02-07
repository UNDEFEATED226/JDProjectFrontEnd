import React from 'react'
import ResourceService from '../Service/ResourceService'

class ViewResourceComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            Resource:{}
        }
    }

    componentDidMount(){
        ResourceService.findById(this.state.id).then(res => {
            this.setState({Resource:res.data});
        })
    }

    render(){
        return(
            <div style={{marginTop:"5%"}} className="text-secondary">
              <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                <h3 className="text-center font-weight-bold card-header">资源详情</h3>
                <div className="card-body">
                    <div className="row">
                        <label>ID:</label>
                        <div>{this.state.Resource.id}</div>
                    </div>
                    <div className="row">
                        <label>所属模块:</label>
                        <div>{this.state.Resource.modulename}</div>
                    </div>
                    <div className="row">
                        <label>资源编码:</label>
                        <div>{this.state.Resource.rescode}</div>
                    </div>
                    <div className="row">
                        <label>资源名称:</label>
                        <div>{this.state.Resource.resname}</div>
                    </div>
                    <div className="row">
                        <label>资源对应URI:</label>
                        <div>{this.state.Resource.resuri}</div>
                    </div>
                    <div className="row">
                        <label>资源对应类型ID:</label>
                        <div>{this.state.Resource.restypeid}</div>
                    </div>
                    <div className="row">
                        <label>父级资源ID:</label>
                        <div>{this.state.Resource.parentid}</div>
                    </div>
                    <div className="row">
                        <label>资源层级:</label>
                        <div>{this.state.Resource.level}</div>
                    </div>
                    <div className="row">
                        <label>是否有子级资源:</label>
                        <div>{this.state.Resource.haschild}</div>
                    </div>
                    <div className="row">
                        <label>描述信息:</label>
                        <div>{this.state.Resource.description}</div>
                    </div>
                    <div className="row">
                        <label>资源编码:</label>
                        <div>{this.state.Resource.routecode}</div>
                    </div>
                    <div className="row">
                        <label>资源完整名称:</label>
                        <div>{this.state.Resource.fullname}</div>
                    </div>
                    <div className="row">
                        <label>selected:</label>
                        <div>{this.state.Resource.selected}</div>
                    </div>
                    <div className="row">
                        <label>is_show:</label>
                        <div>{this.state.Resource.isshow}</div>
                    </div>
                    <div className="row">
                        <label>排序字段:</label>
                        <div>{this.state.Resource.title}</div>
                    </div>
                    <div className="row">
                        <label>是否已删除:</label>
                        <div>{this.state.Resource.isdeleted}</div>
                    </div>
                    <div className="row">
                        <label>创建时间:</label>
                        <div>{this.state.Resource.createtime}</div>
                    </div>
                    <div className="row">
                        <label>最后一次更新时间:</label>
                        <div>{this.state.Resource.updatetime}</div>
                    </div>
                </div>
              </div>
              </div>
        )
    }
}

export default ViewResourceComponent