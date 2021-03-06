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
        this.changeRestypeidHandler=this.changeRestypeidHandler.bind(this);
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
            fullnameformat:'',
            restypeidformat:''
        });
        var bool = false;
        if(this.state.resname.trim() === ''){
            bool = true;
            this.setState({resnameformat:'????????????????????????...'});
        }
        if(this.state.restypeid == null || this.state.restypeid === ''){
            bool = true;
            this.setState({restypeidformat:'?????????????????????'});
        }
        if(bool){
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
                this.setState({modulenameformat:"??????????????????..."});
            }
            if(this.state.resname!=null&&this.state.resname!==''&&this.state.resname.length>512){
                this.setState({resnameformat:"??????????????????..."});
            }
            if(this.state.resuri!=null&&this.state.resuri!==''&&this.state.resuri.length>512){
                this.setState({resuriformat:"????????????URI..."});
            }
            if(this.state.level!=null&&this.state.level!==''&&(isNaN(this.state.level)||this.state.level.length>11)){
                this.setState({levelformat:"??????????????????????????????11???????????????..."});
            }
            if(this.state.description!=null&&this.state.description!==''&&this.state.description.length>256){
                this.setState({descriptionformat:"??????????????????..."});
            }
            if(this.state.fullname!=null&&this.state.fullname!==''&&this.state.fullname.length>255){
                this.setState({fullnameformat:"??????????????????..."});
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
    changeRestypeidHandler=(event)=>{
        this.setState({restypeid:event.target.value});
    }
    cancel(){
        this.props.history.goBack();
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%",color:"#666669",fontFamily:"Sans-Serif",fontSize:"12px"}}>
                <div className="card bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center">??????????????????</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label>*????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.resname} onChange={this.changeResnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.resnameformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>*??????????????????:</label>
                        <select className="form-control" style={{fontSize:"12px"}} value={this.state.restypeid} onChange={this.changeRestypeidHandler}>
                            <option value=''>???????????????????????????...</option>
                            <option value='1'>??????????????????</option>
                            <option value='2'>????????????API</option>
                            <option value='3'>??????????????????</option>
                            <option value='4'>????????????API</option>
                            <option value='5'>???????????????????????????</option>
                            <option value='6'>?????????????????????API</option>
                        </select>
                        <div style={{color:"#f44e3b"}}>{this.state.restypeidformat}</div>    
                    </div>
                   <div className="form-group">
                        <label>????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.modulename} onChange={this.changeModulenameHandler}/>   
                        <div style={{color:"#f44e3b"}}>{this.state.modulenameformat}</div>      
                    </div>
                    <div className="form-group">
                        <label>????????????URI:</label>
                        <input placeholder="?????????????????????URI..." style={{fontSize:"12px"}} className="form-control" value={this.state.resuri} onChange={this.changeResuriHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.resuriformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.level} onChange={this.changeLevelHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.levelformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.descriptionformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>??????????????????:</label>
                        <input placeholder="???????????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.fullname} onChange={this.changeFullnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.fullnameformat}</div>    
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm btn-outline-success" onClick={this.editResource}>??????</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>??????</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditResourceComponent