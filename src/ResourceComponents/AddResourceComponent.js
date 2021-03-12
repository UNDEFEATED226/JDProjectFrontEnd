import React from 'react'
import ResourceService from '../Service/ResourceService'

class AddResourceComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
           resname:'',
           resnameformat:'',
           restypeid:'',
           restypeidformat:''
        } 
        this.changeResnameHandler=this.changeResnameHandler.bind(this);
        this.changeRestypeidHandler=this.changeRestypeidHandler.bind(this);
        this.saveResource=this.saveResource.bind(this);
    }
    
    changeResnameHandler=(event)=>{
        this.setState({resname:event.target.value});
    }
    changeRestypeidHandler=(event)=>{
        this.setState({restypeid:event.target.value});
    }

    saveResource=(r) =>{
        r.preventDefault();
        this.setState({
            resnameformat:'',
            restypeidformat:''
        });
        var bool = false;
        if(this.state.restypeid === ''){
            bool = true;
            this.setState({restypeidformat:"资源对应类型为必选..."});
        }
        if(this.state.resname.trim() === ''){
            bool = true;
            this.setState({resnameformat:'资源名称不能为空...'});
        }
        if(bool){
            throw new Error("INPUT ERROR");
        }
        let resource = {id:'',modulename:'',rescode:'',
            resname:this.state.resname,resuri:'',restypeid:this.state.restypeid,parentid:'',
            level:'',haschild:'',description:'',routecode:'',fullname:'',selected:'',isshow:'',title:'',
            isdeleted:0,createtime:'',updatetime:''};
        ResourceService.addResource(resource).then(res =>{
            this.props.history.push("/resourcelist");
        }).catch(err => {
            if(this.state.resname.length>512){
                this.setState({resnameformat:"资源名称过长..."});
            }
        });
    }

    cancel(){
        this.props.history.goBack();
    }

    render(){
        return(
            <div style={{marginTop:"5%",fontSize:"12px",color:"#666669"}}>
                <div className="card f-size bg-light mx-auto" style={{width:"30rem",fontFamily:"Sans-Serif"}}>
                 <h5 className="card-header text-center">添加资源</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label>*资源名称:</label>
                        <input placeholder="请输入资源名称..." style={{fontSize:"12px"}} className="form-control" value={this.state.resname} onChange={this.changeResnameHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.resnameformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>*资源对应类型:</label>
                        <select className="form-control" style={{fontSize:"12px",color:"#666669"}} onChange={this.changeRestypeidHandler}>
                            <option defaultValue value=''>请选择资源对应类型...</option>
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
                    <button className="btn btn-sm btn-outline-success" onClick={this.saveResource}>保存</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddResourceComponent