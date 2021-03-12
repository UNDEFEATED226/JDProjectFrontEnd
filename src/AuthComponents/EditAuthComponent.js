import React from 'react'
import AuthService from "../Service/AuthService"
import ResourceService from '../Service/ResourceService';

class EditAuthComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id,
            authname:'',
            description:'',
            descriptionformat:'',
            resid:'',
            isdeleted:'',
            createtime:'',
            resources:[]
        }
        this.changeDescriptionHandler=this.changeDescriptionHandler.bind(this);
        this.cancel=this.cancel.bind(this);
        this.editAuth=this.editAuth.bind(this);
    }

    componentDidMount(){
        AuthService.findById(this.state.id).then(res=>{
           let auth = res.data;
            this.setState({
                authname:auth.authname,
                description:auth.description,
                resid:auth.resid,
                isdeleted:auth.isdeleted,
                createtime:auth.createtime
            });
        });
        ResourceService.findAllResource().then(res=>{
            this.setState({resources:res.data});
        });
    }
    changeDescriptionHandler=(event)=>{
        this.setState({description:event.target.value});
    }
    editAuth=(e)=>{
        e.preventDefault();
        this.setState({  
            descriptionformat:'',
        });
        let auth = {id:this.state.id,authname:this.state.authname,description:this.state.description,
            resid:this.state.resid,isdeleted:this.state.isdeleted,createtime:this.state.createtime,updatetime:''
        };
        AuthService.editAuth(this.state.id,auth).then(res => {
            this.props.history.push("/authlist");
        }).catch(err =>{
            if(this.state.description != null && this.state.description.length>256){
                this.setState({descriptionformat:"描述信息过长..."});
            }
        })
    }

    cancel(){
        this.props.history.goBack();
    }

    render(){
        return(
            <div style={{marginTop:"5%",fontSize:"12px",color:"#666669",fontFamily:"sans-serif"}}>
                <div className="card bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center">编辑权限描述信息</h5>
                  <div className="card-body">
                   <form>
                    <div className="form-group">
                        <label>描述信息:</label>
                        <input placeholder="请输入描述信息..." style={{fontSize:"12px"}} className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.descriptionformat}</div>    
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm btn-outline-success" onClick={this.editAuth}>保存</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={this.cancel} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditAuthComponent