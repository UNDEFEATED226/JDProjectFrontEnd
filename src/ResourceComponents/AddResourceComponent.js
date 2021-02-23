import React from 'react'
import ResourceService from '../Service/ResourceService'

class AddResourceComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
           modulename:'',
           modulenameformat:'',
           rescode:'',
           rescodeformat:'',
           resname:'',
           resnameformat:'',
           resuri:'',
           resuriformat:'',
           restypeid:'',
           restypeidformat:''
        }
        this.changeModulenameHandler=this.changeModulenameHandler.bind(this);
        this.changeRescodeHandler=this.changeRescodeHandler.bind(this);
        this.changeResnameHandler=this.changeResnameHandler.bind(this);
        this.changeRestypeidHandler=this.changeRestypeidHandler.bind(this);
        this.changeResuriHandler=this.changeResuriHandler.bind(this);
        this.saveResource=this.saveResource.bind(this);
    }
    
    changeModulenameHandler=(event)=>{
        this.setState({modulename:event.target.value});
    }
    changeRescodeHandler=(event)=>{
        this.setState({rescode:event.target.value});
    }
    changeResnameHandler=(event)=>{
        this.setState({resname:event.target.value});
    }
    changeRestypeidHandler=(event)=>{
        this.setState({restypeid:event.target.value});
    }
    changeResuriHandler=(event)=>{
        this.setState({resuri:event.target.value});
    }

    saveResource=(r) =>{
        r.preventDefault();
        this.setState({
            modulenameformat:'',
            rescodeformat:'',
            resnameformat:'',
            resuriformat:'',
            restypeidformat:''
        });
        if(this.state.restypeid === ''){
            this.setState({restypeidformat:"资源对应类型为必选..."});
            throw new Error("MUST SELECT A RESTYPEID");
        }
        let resource = {id:'',modulename:this.state.modulename,rescode:this.state.rescode,
            resname:this.state.resname,resuri:this.state.resuri,restypeid:this.state.restypeid,parentid:'',
            level:'',haschild:'',description:'',routecode:'',fullname:'',selected:'',isshow:'',title:'',
            isdeleted:0,createtime:'',updatetime:''};
        ResourceService.addResource(resource).then(res =>{
            this.props.history.push("/resourcelist");
        }).catch(err => {
            if(this.state.modulename.length>64){
                this.setState({modulenameformat:"所属模块过长..."});
            }
            if(this.state.rescode.length>64){
                this.setState({rescodeformat:"资源编码过长..."});
            }
            if(this.state.resname.length>512){
                this.setState({resnameformat:"资源名称过长..."});
            }
            if(this.state.resuri.length>512){
                this.setState({resuriformat:"资源对应URI过长..."});
            }
        });
    }

    cancel(){
        this.props.history.push("/resourcelist");
    }

    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card f-size bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center font-weight-bold text-secondary">添加资源</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">所属模块:</label>
                        <input placeholder="请输入所属模块..." style={{fontSize:"12px"}} className="form-control" value={this.state.modulename} onChange={this.changeModulenameHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.modulenameformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源编码:</label>
                        <input placeholder="请输入资源编码..." style={{fontSize:"12px"}} className="form-control" value={this.state.rescode} onChange={this.changeRescodeHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.rescodeformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源名称:</label>
                        <input placeholder="请输入资源名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.resname} onChange={this.changeResnameHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.resnameformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源对应URI:</label>
                        <input placeholder="请输入资源对应URI..." style={{fontSize:"12px"}} className="form-control" value={this.state.resuri} onChange={this.changeResuriHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.resuriformat}</div>    
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">资源对应类型ID:</label>
                        <select className="form-control" style={{fontSize:"12px"}} onChange={this.changeRestypeidHandler}>
                            <option defaultValue value=''>请选择资源对应类型ID:</option>
                            <option value='1'>物管平台菜单</option>
                            <option value='2'>物管平台API</option>
                            <option value='3'>能源平台菜单</option>
                            <option value='4'>能源平台API</option>
                            <option value='5'>能源平台侧政府菜单</option>
                            <option value='6'>能源平台侧政府API</option>
                        </select>
                        <div style={{color:"#f44e3b"}}>{this.state.restypeidformat}</div>    
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm green-btn font-weight-bold text-white" onClick={this.saveResource}>保存</button>
                    <button className="btn btn-sm red-btn font-weight-bold text-white" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddResourceComponent