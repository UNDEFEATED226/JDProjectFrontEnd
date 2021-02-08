import React from 'react'
import AuthService from "../Service/AuthService"

class EditAuthComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id,
            authname:'',
            authnameformat:'',
            description:'',
            descriptionformat:'',
            resid:'',
            residformat:'',
            isdeleted:'',
            createtime:''
        }
        this.changeAuthnameHandler=this.changeAuthnameHandler.bind(this);
        this.changeDescriptionHandler=this.changeDescriptionHandler.bind(this);
        this.changeResidHandler=this.changeResidHandler.bind(this);
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
    }

    changeAuthnameHandler=(event)=>{
        this.setState({authname:event.target.value});
    }

    changeDescriptionHandler=(event)=>{
        this.setState({description:event.target.value});
    }
    
    changeResidHandler=(event)=>{
        this.setState({resid:event.target.value});
    }

    editAuth=(e)=>{
        e.preventDefault();
        this.setState({
            authnameformat:'',
            descriptionformat:'',
            residformat:''
        });
        let auth = {id:this.state.id,authname:this.state.authname,description:this.state.description,
            resid:this.state.resid,isdeleted:this.state.isdeleted,createtime:this.state.createtime,updatetime:''
        };
        AuthService.editAuth(this.state.id,auth).then(res => {
            this.props.history.push("/authlist");
        }).catch(err =>{
            if(this.state.authname!=null && this.state.authname.length>64){
                this.setState({authnameformat:"权限名称过长..."});
            }
            if(this.state.description != null && this.state.description.length>256){
                this.setState({descriptionformat:"描述信息过长..."});
            }
            if(this.state.resid!=null && (isNaN(this.state.resid)||this.state.resid.length>11)){
                this.setState({residformat:"资源ID为至多11位的纯数字..."});
            }
        })
    }

    cancel(){
        this.props.history.push("/authlist");
    }

    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                 <h3 className="card-header text-center font-weight-bold text-secondary">编辑权限资料</h3>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">权限名称:</label>
                        <input placeholder="请输入权限名称..." className="form-control" value={this.state.authname} onChange={this.changeAuthnameHandler}/>    
                        <div style={{color:"#f44e3b"}}>{this.state.authnameformat}</div>     
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">描述信息:</label>
                        <input placeholder="请输入描述信息..." className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.descriptionformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源ID:</label>
                        <input placeholder="请输入资源ID..." className="form-control" value={this.state.resid} onChange={this.changeResidHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.residformat}</div>    
                    </div>
                    <button className="btn btn-success" onClick={this.editAuth}>保存</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditAuthComponent