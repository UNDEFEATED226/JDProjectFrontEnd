import React from 'react'
import ResourceService from '../Service/ResourceService'

class EditResourceComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            modulename:'',
            modulenameformat:'',
            rescode:'',
            resname:'',
            resnameformat:'',
            resuri:'',
            resuriformat:'',
            restypeid:'',
            parentid:'',
            level:'',
            levelformat:'',
            haschild:'',
            description:'',
            descriptionformat:'',
            routecode:'',
            fullname:'',
            fullnameformat:'',
            selected:'',
            isshow:'',
            title:'',
            isdeleted:'',
            createtime:'',
            updatetime:''
        }
        this.changeModulenameHandler=this.changeModulenameHandler.bind(this);
        this.changeResnameHandler=this.changeResnameHandler.bind(this);
        this.changeResuriHandler=this.changeResuriHandler.bind(this);
        this.changeLevelHandler=this.changeLevelHandler.bind(this);
        this.changeDescriptionHandler=this.changeDescriptionHandler.bind(this);
        this.changeFullnameHandler=this.changeFullnameHandler.bind(this);
        this.editResource=this.editResource.bind(this);
    }
    
    componentDidMount(){
        ResourceService.findById(this.state.id).then(res => {
           let Resource=res.data;
           this.setState({
               modulename:Resource.modulename,
               rescode:Resource.rescode,
               resname:Resource.resname,
               resuri:Resource.resuri,
               restypeid:Resource.restypeid,
               parentid:Resource.parentid,
               level:Resource.level,
               haschild:Resource.haschild,
               description:Resource.description,
               routecode:Resource.routecode,
               fullname:Resource.fullname,
               selected:Resource.selected,
               isshow:Resource.isshow,
               title:Resource.title,
               isdeleted:Resource.isdeleted,
               createtime:Resource.createtime
           });
        });
    }

    editResource=(r)=>{
        r.preventDefault();
        this.setState({
            modulenameformat:'',
            resnameformat:'',
            resuriformat:'',
            levelformat:'',
            descriptionformat:'',
            fullnameformat:''
        });
        if(this.state.resname.trim() === ''){
            this.setState({resnameformat:'资源名称不能为空...'});
            throw new Error('INPUT ERROR');
        }
        let Resource= {id:this.state.id,modulename:this.state.modulename,rescode:this.state.rescode,
            resname:this.state.resname,resuri:this.state.resuri,restypeid:this.state.restypeid,
            parentid:this.state.parentid,level:this.state.level,haschild:this.state.haschild,
            description:this.state.description,routecode:this.state.routecode,fullname:this.state.fullname,
            selected:this.state.selected,isshow:this.state.isshow,title:this.state.title
            ,isdeleted:this.state.isdeleted,createtime:this.state.createtime,updatetime:this.state.updatetime};
        ResourceService.editResource(this.state.id,Resource).then(res =>{
            this.props.history.push("/resourcelist");
        }).catch(err =>{
            if(this.state.modulename!=null&&this.state.modulename!==''&&this.state.modulename.length>64){
                this.setState({modulenameformat:"所属模块过长..."});
            }
            if(this.state.resname!=null&&this.state.resname!==''&&this.state.resname.length>512){
                this.setState({resnameformat:"资源名称过长..."});
            }
            if(this.state.resuri!=null&&this.state.resuri!==''&&this.state.resuri.length>512){
                this.setState({resuriformat:"资源对应URI..."});
            }
            if(this.state.level!=null&&this.state.level!==''&&(isNaN(this.state.level)||this.state.level.length>11)){
                this.setState({levelformat:"资源层级为长度至多为11位的纯数字..."});
            }
            if(this.state.description!=null&&this.state.description!==''&&this.state.description.length>256){
                this.setState({descriptionformat:"描述信息过长..."});
            }
            if(this.state.fullname!=null&&this.state.fullname!==''&&this.state.fullname.length>255){
                this.setState({fullnameformat:"资源完整名称..."});
            }
        });
    }

    changeModulenameHandler=(event) =>{
        this.setState({modulename:event.target.value});
    }
    changeResnameHandler=(event) =>{
        this.setState({resname:event.target.value});
    }
    changeResuriHandler=(event) =>{
        this.setState({resuri:event.target.value});
    }
    changeLevelHandler=(event) =>{
        this.setState({level:event.target.value});
    }
    changeDescriptionHandler=(event) =>{
        this.setState({description:event.target.value});
    }
    changeFullnameHandler=(event) =>{
        this.setState({fullname:event.target.value});
    }
    cancel(){
        this.props.history.push("/resourcelist");
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card f-size bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center font-weight-bold text-secondary">编辑资源资料</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源名称:</label>
                        <input placeholder="请输入资源名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.resname} onChange={this.changeResnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.resnameformat}</div>    
                    </div>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">所属模块:</label>
                        <input placeholder="请输入所属模块..." style={{fontSize:"12px"}} className="form-control" value={this.state.modulename} onChange={this.changeModulenameHandler}/>   
                        <div style={{color:"#f44e3b"}}>{this.state.modulenameformat}</div>      
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源对应URI:</label>
                        <input placeholder="请输入资源对应URI..." style={{fontSize:"12px"}} className="form-control" value={this.state.resuri} onChange={this.changeResuriHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.resuriformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源层级:</label>
                        <input placeholder="请输入资源层级..." style={{fontSize:"12px"}} className="form-control" value={this.state.level} onChange={this.changeLevelHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.levelformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">描述信息:</label>
                        <input placeholder="请输入描述信息..." style={{fontSize:"12px"}} className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.descriptionformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源完整名称:</label>
                        <input placeholder="请输入资源完整名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.fullname} onChange={this.changeFullnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.fullnameformat}</div>    
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm green-btn font-weight-bold text-white" onClick={this.editResource}>保存</button>
                    <button className="btn btn-sm red-btn font-weight-bold text-white" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditResourceComponent