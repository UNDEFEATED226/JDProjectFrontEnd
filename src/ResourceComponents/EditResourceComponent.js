import React from 'react'
import ResourceService from '../Service/ResourceService'

class EditResourceComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            modulename:'',
            rescode:'',
            resname:'',
            resuri:'',
            restypeid:'',
            parentid:'',
            level:'',
            haschild:'',
            description:'',
            routecode:'',
            fullname:'',
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
        let Resource= {id:this.state.id,modulename:this.state.modulename,rescode:this.state.rescode,
            resname:this.state.resname,resuri:this.state.resuri,restypeid:this.state.restypeid,
            parentid:this.state.parentid,level:this.state.level,haschild:this.state.haschild,
            description:this.state.description,routecode:this.state.routecode,fullname:this.state.fullname,
            selected:this.state.selected,isshow:this.state.isshow,title:this.state.title
            ,isdeleted:this.state.isdeleted,createtime:this.state.createtime,updatetime:this.state.updatetime};
        ResourceService.editResource(this.state.id,Resource).then(res =>{
            this.props.history.push("/resourcelist");
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
        this.props.history.push('/resourcelist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                 <h3 className="card-header text-center font-weight-bold text-secondary">编辑资源资料</h3>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">所属模块:</label>
                        <input placeholder="请输入所属模块..." className="form-control" value={this.state.modulename} onChange={this.changeModulenameHandler}/>     
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源名称:</label>
                        <input placeholder="请输入资源名称..." className="form-control" value={this.state.resname} onChange={this.changeResnameHandler}/>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源对应URI:</label>
                        <input placeholder="请输入资源对应URI..." className="form-control" value={this.state.resuri} onChange={this.changeResuriHandler}/>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源层级:</label>
                        <input placeholder="请输入资源层级..." className="form-control" value={this.state.level} onChange={this.changeLevelHandler}/>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">描述信息:</label>
                        <input placeholder="请输入描述信息..." className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源完整名称:</label>
                        <input placeholder="请输入资源完整名称..." className="form-control" value={this.state.fullname} onChange={this.changeFullnameHandler}/>
                    </div>
                    <button className="btn btn-success" onClick={this.editResource}>保存</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditResourceComponent