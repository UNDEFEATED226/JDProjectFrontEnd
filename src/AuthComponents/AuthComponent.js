import React from 'react'
import moment from 'moment'
import AuthService from '../Service/AuthService'

class AuthComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:1,
            auths:[]
        }
        this.firstPage=this.firstPage.bind(this);
        this.lastPage=this.lastPage.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.addAuth=this.addAuth.bind(this);
        this.editAuth=this.editAuth.bind(this);
        this.deleteAuth=this.deleteAuth.bind(this);
        this.findAllAuth=this.findAllAuth.bind(this);
    }
    
    componentDidMount(){
        this.findAllAuth(this.state.pageNo);
    }

    findAllAuth(p){
        AuthService.findAllAuthPaginated(p).then(res=>{
            this.setState({auths:res.data.content});
        });
        AuthService.page().then(res=>{
            this.setState({totalPages:res.data});
        });
        AuthService.count().then(res=>{
            this.setState({totalElements:res.data});
        });
        this.setState({pageNo:p});
    }

    firstPage=()=>{
        this.findAllAuth(1);
    }
    
    lastPage=()=>{
        this.findAllAuth(this.state.totalPages);
    }

    pageUp=()=>{
        this.findAllAuth(this.state.pageNo+1);
    }

    pageDown=()=>{
        this.findAllAuth(this.state.pageNo-1);
    }

    addAuth(){
        this.props.history.push("/addauth");
    }

    editAuth(id){
        this.props.history.push(`/editauth/${id}`);
    }

    deleteAuth(id){
        AuthService.deleteAuth(id).then(res => {
            if(this.state.pageNo === this.state.totalPages && this.state.pageNo>1){
                if(this.state.auths.length === 1){
                    this.findAllAuth(this.state.pageNo-1);
                }else{
                    this.findAllAuth(this.state.pageNo);
                }
            }else{
                this.findAllAuth(this.state.pageNo);
            }
        });
    }

    render(){
       return(
        <div>
        <h3 className="text-center" style={{color:"#666669",marginTop:"3.5%"}}>????????????</h3>
        <button className="btn btn-sm btn-outline-primary" onClick={this.addAuth}>????????????</button>
        <table className="table" style={{color:"#666669",fontSize:"12px "}}> 
           <thead className="text-justify">
                <tr>
                  <th style={{columnWidth:"80px"}}>id</th>
                  <th style={{columnWidth:"200px"}}>????????????</th>  
                  <th style={{columnWidth:"170px"}}>????????????</th>  
                  <th style={{columnWidth:"170px"}}>????????????</th> 
                  <th style={{columnWidth:"190px"}}>????????????</th>
                  <th style={{columnWidth:"190px"}}>????????????????????????</th>
                  <th className="text-center" style={{columnWidth:"300px"}}>??????</th>
                </tr>
                </thead>
             <tbody>
                 {
                     this.state.auths.map(
                         auth =>
                         <tr key= {auth.id}>         
                             <td className="t-cell" style={{maxWidth:"80px"}} data-toggle='tooltip' title={auth.id}>{auth.id}</td>
                             <td className="t-cell" style={{maxWidth:"200px"}} data-toggle='tooltip' title={auth.authname}>{auth.authname}</td>
                             <td className="t-cell" style={{maxWidth:"170px"}} data-toggle='tooltip' title={auth.description}>{auth.description}</td>
                             <td className="t-cell" style={{maxWidth:"170px",color:auth.resname ==='???????????????????????????' ? 'red':undefined}} data-toggle='tooltip' title={auth.resname}>{auth.resname}</td>
                             <td className="t-cell" style={{maxWidth:"190px"}}>{moment(auth.createtime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell" style={{maxWidth:"190px"}}>{moment(auth.updatetime).format('YYYY-MM-DD HH:mm:ss')}</td>
                             <td className="t-cell text-center" style={{maxWidth:"300px"}}>
                                <button className="btn btn-sm btn-outline-success" onClick={()=>this.editAuth(auth.id)}>?????????????</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={()=>{if(window.confirm('??????????????????????')){this.deleteAuth(auth.id)}}} style={{marginLeft:"10px"}}>?????????????</button>
                             </td>
                         </tr>
                     )  
                 }
             </tbody>
        </table>
        <div className="text-center">
            <button className="btn btn-sm btn-outline-dark" onClick={this.firstPage} disabled={(this.state.pageNo == null || this.state.pageNo<=1) ? true : false}>first page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageDown} disabled={(this.state.pageNo == null || this.state.pageNo<=1) ? true :false}>previous page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.pageUp} disabled={(this.state.pageNo == null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>next page</button>
            <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"10px"}} onClick={this.lastPage} disabled={(this.state.pageNo == null || this.state.totalPages==null || this.state.pageNo>=this.state.totalPages) ? true : false}>last page</button>
        </div>
        <div className="text-center" style={{fontSize:"12px",color:"#666669",marginTop:"10px"}}>
        <div>{this.state.pageNo} of {this.state.totalPages} ???</div>
        <div>???{this.state.totalElements}??????</div>
        </div>
    </div>
       )
    }
}

export default AuthComponent 