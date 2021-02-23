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
        ResourceService.findAllResource().then(res=>{
            this.setState({resources:res.data});
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
                        <label className="text-secondary font-weight-bold">权限:</label>
                        <select className="form-control" onChange={this.changeAuthnameHandler}>
                            <option defaultValue value={this.state.authname}>请选择权限</option>
                            <option value='API_INVOKE_PERMISSION'>API调用权限</option>
                            <option value='CANCEL_JOB_PERMISSION'>取消任务</option>
                            <option value='CREATE_PERMISSION'>创建(CREATE_PERMISSION)</option>
                            <option value='DELETE_PERMISSION'>删除</option>
                            <option value='DOWNLOAD_CERTIFICATE_PERMISSION'>下载证书</option>
                            <option value='POST_MESSAGE'>创建(POST_MESSAGE)</option>
                            <option value='PUBLIC_PERMISSION'>发布</option>
                            <option value='QUERY_LOG_PERMISSION'>查看日志</option>
                            <option value='QUERY_PERMISSION'>查询</option>
                            <option value='START_JOB_PERMISSION'>启动任务</option>
                            <option value='START_PERMISSION'>运行规则</option>
                            <option value='STOP_JOB_PERMISSION'>暂停任务</option>
                            <option value='STOP_PERMISSION'>停止规则</option>
                            <option value='UPDATE_PERMISSION'>修改</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">描述信息:</label>
                        <input placeholder="请输入描述信息..." className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.descriptionformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源:</label>
                        <select className="form-control" onChange={this.changeResidHandler}>
                            <option defaultValue value={this.state.resid}>请选择资源</option>
                            {
                                this.state.resources.map(
                                    resource =>
                                    <option value={resource.id}>{resource.resname}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-lg btn-outline-success" onClick={this.editAuth}>保存</button>
                    <button className="btn btn-lg btn-outline-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditAuthComponent