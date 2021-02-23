import React from 'react'
import AuthService from '../Service/AuthService'
import ResourceService from '../Service/ResourceService';

class AddAuthComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            resid:'',
            residformat:'',
            authname:'',
            authnameformat:'',
            resources:[]
        }
        this.changeAuthnameHandler=this.changeAuthnameHandler.bind(this);
        this.changeResidHandler=this.changeResidHandler.bind(this);
        this.saveAuth=this.saveAuth.bind(this);
    }

    changeAuthnameHandler=(event)=>{
        this.setState({authname:event.target.value});
    }
    changeResidHandler=(event)=>{
        this.setState({resid:event.target.value});
    }
    componentDidMount(){
        ResourceService.findAllResource().then(res=>{
            this.setState({resources:res.data});
        })
    }
    saveAuth=(a) =>{
        a.preventDefault();
        var bool = false;
        this.setState({
            authnameformat:'',
            residformat:''
        });
        if(this.state.resid===''){
            this.setState({residformat:"请选择资源ID..."});
            bool=true;
        }
        if(this.state.authname===''){
            this.setState({authnameformat:"请选择权限名称..."});
            bool=true;
        }
        if(bool){
            throw new Error("FORMAT ERROR");
        }
        let auth = {id:'',authname:this.state.authname,description:'',resid:this.state.resid,isdeleted:0,
        createtime:'',updatetime:''};
        AuthService.addAuth(auth).then(res =>{
            this.props.history.push("/authlist");
        });
    }

    cancel(){
        this.props.history.push("/authlist");
    }

    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card f-size bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center font-weight-bold text-secondary">添加权限</h5>
                  <div className="card-body">
                   <form>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源:</label>
                        <select className="form-control" style={{fontSize:"12px"}} value={this.state.resid} onChange={this.changeResidHandler}>
                            <option defaultValue value=''>请选择资源:</option>
                            {
                                this.state.resources.map(
                                    resource =>
                                    <option value={resource.id}>{resource.resname}</option>
                                )
                            }
                        </select>
                        <div style={{color:"#f44e3b"}}>{this.state.residformat}</div>    
                    </div>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">权限:</label>
                        <select className="form-control" style={{fontSize:"12px"}} value={this.state.authname} onChange={this.changeAuthnameHandler}>
                            <option defaultValue value=''>请选择权限:</option>
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
                        <div style={{color:"#f44e3b"}}>{this.state.authnameformat}</div>    
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm green-btn font-weight-bold text-white" onClick={this.saveAuth}>保存</button>
                    <button className="btn btn-sm red-btn font-weight-bold text-white" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddAuthComponent