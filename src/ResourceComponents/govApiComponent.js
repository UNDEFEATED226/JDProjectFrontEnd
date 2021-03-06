import React from 'react'
import moment from 'moment'
import ResourceService from '../Service/ResourceService'

class govApiComponent extends React.Component{
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
        this.viewResource=this.viewResource.bind(this);
        this.editResource=this.editResource.bind(this);
        this.deleteResource=this.deleteResource.bind(this);
        this.addResource=this.addResource.bind(this);
        this.findAllResource=this.findAllResource.bind(this);
    }
    
    componentDidMount(){
        this.findAllResource(this.state.pageNo);
    }

    findAllResource(p){
        ResourceService.resourceMenuPaginated(6,p).then(res=>{
            this.setState({resources:res.data.content});
        });
        ResourceService.countByRestypeid(6).then(res=>{
            this.setState({totalElements:res.data});
        });
        ResourceService.pageByRestypeid(6).then(res=>{
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
        <h3 className="text-center" style={{color:"#666669",marginTop:"3.5%"}}>?????????????????????API</h3>
        <button className="btn btn-sm btn-outline-primary" onClick={this.addResource}>????????????</button>
        <table className="table f-size table-boarder" style={{color:"#666669",fontFamily:'Sans-Serif'}}> 
           <thead className="text-justify">
                <tr>
                  <th style={{columnWidth:"50px"}}>id</th>
                  <th style={{columnWidth:"200px"}}>????????????</th>  
                  <th style={{columnWidth:"200px"}}>????????????</th>  
                  <th style={{columnWidth:"190px"}}>????????????</th>  
                  <th style={{columnWidth:"190px"}}>????????????????????????</th> 
                  <th style={{columnWidth:"300px"}}>??????</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.resources.map(
                         resource =>
                         <tr key= {resource.id}>         
                             <td className="t-cell" style={{maxWidth:"50px"}} data-toggle='tooltip' title={resource.id}>{resource.id}</td>
                             <td className="t-cell" style={{maxWidth:"200px"}} data-toggle='tooltip' title={resource.resname}>{resource.resname}</td>
                             <td className="t-cell" style={{maxWidth:"200px"}} data-toggle='tooltip' title={resource.description}>{resource.description}</td>
                             <td className="t-cell" style={{maxWidth:"190px"}}>{moment(resource.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell" style={{maxWidth:"190px"}}>{moment(resource.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell text-center" style={{maxWidth:"300px"}}>
                                <button className="btn btn-sm btn-outline-info" onClick={() => this.viewResource(resource.id)}>??????????</button>
                                <button className="btn btn-sm btn-outline-success" onClick={() => this.editResource(resource.id)} style={{marginLeft:"10px"}}>?????????????</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => {if(window.confirm('??????????????????????')){this.deleteResource(resource.id)}}} style={{marginLeft:"10px"}}>?????????????</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
        <div className="text-center">
            <button className="btn btn-sm btn-outline-dark" onClick={this.firstPage} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>first page</button>
            <button className="btn btn-sm btn-outline-dark" onClick={this.pageDown} style={{marginLeft:"10px"}} disabled={(this.state.pageNo==null || this.state.pageNo<=1) ? true : false}>previous page</button>
            <button className="btn btn-sm btn-outline-dark" onClick={this.pageUp} style={{marginLeft:"10px"}} disabled={(this.state.pageNo==null||this.state.totalPages==null||this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
            <button className="btn btn-sm btn-outline-dark" onClick={this.lastPage} style={{marginLeft:"10px"}} disabled={(this.state.pageNo==null||this.state.totalPages==null||this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>

        </div>
        <div className="text-center" style={{fontSize:"12px",color:"#666669",marginTop:"10px"}}>
        <div>{this.state.pageNo} of {this.state.totalPages} ???</div>
        <div>???{this.state.totalElements}??????(?????????????????????API)</div>
        </div>
    </div>
       )
    }
}

export default govApiComponent
 