import React from 'react'
import moment from 'moment'
import ResourceService from '../Service/ResourceService'

class eApiComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:1,
            resources:[]
        }
        this.firstPage=this.firstPage.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.editResource=this.editResource.bind(this);
        this.viewResource=this.viewResource.bind(this);
        this.deleteResource=this.deleteResource.bind(this);
        this.addResource=this.addResource.bind(this);
        this.findAllResource=this.findAllResource.bind(this);
    }
    
    componentDidMount(){
        this.findAllResource(this.state.pageNo);
    }

    findAllResource(p){
        ResourceService.resourceMenuPaginated(4,p).then(res=>{
            this.setState({resources:res.data.content});
        });
        ResourceService.countByRestypeid(4).then(res=>{
            this.setState({totalElements:res.data});
        });
        ResourceService.pageByRestypeid(4).then(res=>{
            this.setState({totalPages:res.data});
        });
        this.setState({pageNo:p});
    }

    firstPage=()=>{
        this.findAllResource(1);
    }

    lastPage=()=>{
        this.findAllResource(this.state.totalPages);
    }

    pageUp=()=>{
        this.findAllResource(this.state.pageNo+1);
    }

    pageDown=()=>{
        this.findAllResource(this.state.pageNo-1);
    }

    viewResource(id){
        this.props.history.push(`/viewresource/${id}`);
    }

    editResource(id){
        this.props.history.push("/editresource/"+id);
    }

    deleteResource(id){
        ResourceService.deleteResource(id).then(res=>{
            if(this.state.pageNo === this.state.totalPages && this.state.pageNo>1){
                if(this.state.resources.length === 1){
                    this.findAllResource(this.state.pageNo-1);
                }else{
                    this.findAllResource(this.state.pageNo);
                }
            }else{
                this.findAllResource(this.state.pageNo);
            }
        });
    }

    addResource(){
        this.props.history.push("/addresource");
    }

    render(){
       return(
        <div>
        <br></br>
        <h3 className="text-center font-weight-bold text-secondary">能源平台API</h3>
        <button className="btn btn-sm blue-btn text-white font-weight-bold" onClick={this.addResource}>添加资源</button>
        <table className="table table-boarder f-size"> 
           <thead className="text-justify">
                <tr>
                 <th  className="text-secondary" style={{columnWidth:"30px"}}>id</th>
                  <th  className="text-secondary" style={{columnWidth:"120px"}}>资源名称</th>  
                  <th  className="text-secondary" style={{columnWidth:"80px"}}>描述信息</th>  
                  <th  className="text-secondary" style={{columnWidth:"190px"}}>创建时间</th>  
                  <th  className="text-secondary" style={{columnWidth:"190px"}}>最后一次更新时间</th> 
                  <th  className="text-secondary text-center" style={{columnWidth:"300px"}}>操作</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.resources.map(
                         resource =>
                         <tr key= {resource.id}>         
                             <td className="t-cell" style={{maxWidth:"30px"}}>{resource.id}</td>
                             <td className="t-cell" style={{maxWidth:"120px"}}>{resource.resname}</td>
                             <td className="t-cell" style={{maxWidth:"80px"}}>{resource.description}</td>
                             <td className="t-cell" style={{maxWidth:"190px"}}>{moment(resource.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell" style={{maxWidth:"190px"}}>{moment(resource.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell text-center" style={{maxWidth:"300px"}}>
                                <button className="btn btn-sm yellow-btn text-white font-weight-bold" onClick={() => this.viewResource(resource.id)}>查看详情</button>
                                <button className="btn btn-sm green-btn text-white font-weight-bold" onClick={() => this.editResource(resource.id)} style={{marginLeft:"10px"}}>编辑资料</button>
                                <button className="btn btn-sm red-btn text-white font-weight-bold" onClick={() => this.deleteResource(resource.id)} style={{marginLeft:"10px"}}>删除</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
        <div className="text-center">
            <button className="btn color-btn btn-sm text-white font-weight-bold" onClick={this.firstPage} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>first page</button>
            <button className="btn color-btn btn-sm text-white font-weight-bold" onClick={this.pageDown} style={{marginLeft:"10px"}} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>previous page</button>
            <button className="btn color-btn btn-sm text-white font-weight-bold" onClick={this.pageUp} style={{marginLeft:"10px"}} disabled={(this.state.pageNo==null||this.state.totalPages==null||this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
            <button className="btn color-btn btn-sm text-white font-weight-bold" onClick={this.lastPage} style={{marginLeft:"10px"}} disabled={(this.state.pageNo==null||this.state.totalPages==null||this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>

        </div>
        <div className="text-center color-font font-weight-bold">{this.state.pageNo} of {this.state.totalPages} 页</div>
        <div className="text-center color-font font-weight-bold">共{this.state.totalElements}资源(能源平台API)</div>
    </div>
       )
    }
}

export default eApiComponent 