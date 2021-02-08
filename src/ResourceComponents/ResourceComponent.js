import React from 'react'
import ResourceService from '../Service/ResourceService'

class ResourceComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            resources:[]
        }
        this.viewResource=this.viewResource.bind(this);
        this.editResource=this.editResource.bind(this);
        this.deleteResource=this.deleteResource.bind(this);
        this.addResource=this.addResource.bind(this);
    }
    
    componentDidMount(){
        ResourceService.findAllResource().then((response) => {
            this.setState({resources:response.data})
        });
    }

    viewResource(id){
        this.props.history.push(`/viewresource/${id}`);
    }

    editResource(id){
        this.props.history.push(`/editresource/${id}`);
    }

    deleteResource(id){
        this.props.history.push(`/deleteresource/${id}`);
    }

    addResource(){
        this.props.history.push("/addresource");
    }

    render(){
       return(
        <div>
        <br></br>
        <h1 className="text-center font-weight-bold text-secondary">资源列表</h1>
        <button className="btn btn-lg btn-secondary text-white font-weight-bold" onClick={this.addResource}>添加资源</button>
        <table className="table table-striped table-boarder"> 
           <thead className="text-justify">
                <tr>
                 <th  className="text-secondary">id</th>
                  <th  className="text-secondary">资源名称</th>  
                  <th  className="text-secondary">描述信息</th>  
                  <th  className="text-secondary">创建时间</th>  
                  <th  className="text-secondary">最后一次更新时间</th> 
                  <th  className="text-secondary">操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.resources.map(
                         resource =>
                         <tr key= {resource.id}>         
                             <td>{resource.id}</td>
                             <td>{resource.resname}</td>
                             <td>{resource.description}</td>
                             <td>{resource.createtime}</td>
                             <td>{resource.updatetime}</td>
                             <td>
                                <button className="btn btn-secondary font-weight-bold" onClick={() => this.viewResource(resource.id)}>查看详情</button>
                                <button className="btn btn-secondary font-weight-bold" onClick={() => this.editResource(resource.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
    </div>
       )
    }
}

export default ResourceComponent 