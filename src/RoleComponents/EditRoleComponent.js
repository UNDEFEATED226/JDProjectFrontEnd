import React from 'react'
import RoleService from '../Service/RoleService'
import TenantService from '../Service/TenantService';

class EditRoleComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            rolename:'',
            rolenameformat:'',
            roletype:'',
            roletypeformat:'',
            description:'',
            descriptionformat:'',
            tenantid:'',
            tenantidformat:'',
            isdeleted:'',
            issystem:'',
            createtime:'',
            updatetime:'',
            rolecode:'',
            rolecodeformat:'',
            isforbidden:'',
            isdefault:'',
            tenants:[]
        }
        this.changeRolenameHandler=this.changeRolenameHandler.bind(this);
        this.changeRoletypeHandler=this.changeRoletypeHandler.bind(this);
        this.changeDescriptionHandler=this.changeDescriptionHandler.bind(this);
        this.changeTenantidHandler=this.changeTenantidHandler.bind(this);
    }
    
    componentDidMount(){
        RoleService.findById(this.state.id).then(res => {
           let role=res.data;
           this.setState({
               rolename:role.rolename,
               roletype:role.roletype,
               description:role.description,
               tenantid:role.tenantid,
               isdeleted:role.isdeleted,
               issystem:role.issystem,
               createtime:role.createtime,
               rolecode:role.rolecode,
               isforbidden:role.isforbidden,
               isdefault:role.isdefault
           });
        });
        TenantService.findAllTenant().then(res=>{
            this.setState({tenants:res.data});
        });
    }

    changeRolenameHandler=(event)=>{
        this.setState({rolename:event.target.value});
    }
    changeRoletypeHandler=(event)=>{
        this.setState({roletype:event.target.value});
    }
    changeDescriptionHandler=(event)=>{
        this.setState({description:event.target.value});
    }
    changeTenantidHandler=(event)=>{
        this.setState({tenantid:event.target.value});
    }
    changeIssystemHandler=(event)=>{
        this.setState({issystem:event.target.value});
    }
    changeRolecodeHandler=(event)=>{
        this.setState({rolecode:event.target.value});
    }
    changeIsforbiddenHandler=(event)=>{
        this.setState({isforbidden:event.target.value});
    }
    changeIsdefaultHandler=(event)=>{
        this.setState({isdefault:event.target.value});
    }

    editRole=(r)=>{
        r.preventDefault();
        this.setState({
            rolenameformat:'',
            roletypeformat:'',
            descriptionformat:'',
            tenantidformat:'',
            rolecodeformat:''
        });
        var bool = false;
        if(this.state.rolename.trim()===''){
            bool = true;
            this.setState({rolenameformat:'????????????????????????...'});
        }
        if(this.state.roletype === '' || this.state.roletype == null){
            bool = true;
            this.setState({roletypeformat:'?????????????????????...'});
        }
        if(bool){
            throw new Error('INPUT ERROR');
        }
        let role= {id:this.state.id,rolename:this.state.rolename,roletype:this.state.roletype,
        description:this.state.description,tenantid:this.state.tenantid,isdeleted:this.state.isdeleted,
        issystem:this.state.issystem,createtime:this.state.createtime,updatetime:this.state.updatetime,
        rolecode:this.state.rolecode,isforbidden:this.state.isforbidden,isdefault:this.state.isdefault};
        RoleService.editRole(this.state.id,role).then(res =>{
            this.props.history.push("/rolelist");
        }).catch(err => {
            if(this.state.rolename!=null && this.state.rolename.length>64){
                this.setState({rolenameformat:"??????????????????..."});
            }
            if(this.state.roletype!=null && (isNaN(this.state.roletype)||this.state.roletype.length>11)){
                this.setState({roletypeformat:" ????????????ID?????????11????????????..."});
            }
            if(this.state.description!=null && this.state.description.length>256){
                this.setState({descriptionformat:"??????????????????..."});
            }
            if(this.state.tenantid!=null && (isNaN(this.state.tenantid)||this.state.tenantid.length>11)){
                this.setState({tenantidformat:"??????ID?????????11????????????..."});
            }
            if(this.state.rolecode!=null && this.state.rolecode.length>100){
                this.setState({rolecodeformat:"??????????????????..."});
            }
        })
    }

    cancel(){
        this.props.history.push('/rolelist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%",fontSize:"12px",fontFamily:"Sans-Serif",color:"#666669"}}>
                <div className="card bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center">??????????????????</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label>*????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.rolename} onChange={this.changeRolenameHandler}/>    
                        <div style={{color:"#f44e3b"}}>{this.state.rolenameformat}</div>     
                    </div>
                    <div className="form-group">
                        <label>*????????????:</label>
                        <select className="form-control" style={{fontSize:"12px",color:"#666669"}} value={this.state.roletype} onChange={this.changeRoletypeHandler}>
                            <option value =''>?????????????????????...</option>
                            <option value='1'>????????????</option>
                            <option value='2'>????????????</option>
                        </select>
                        <div style={{color:"#f44e3b"}}>{this.state.roletypeformat}</div>   
                    </div>
                    <div className="form-group">
                        <label>????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.descriptionformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>??????:</label>
                        <select className="text-secondary form-control" style={{fontSize:"12px"}} value={this.state.tenantid} onChange={this.changeTenantidHandler}>
                            <option value=''>???????????????...</option>
                            {
                                this.state.tenants.map(
                                    tenant => 
                                    <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>?????????????????????:</label>
                        <select className="text-secondary form-control" style={{fontSize:"12px"}} value={this.state.issystem} onChange={this.changeIssystemHandler}>
                            <option value=''>??????????????????????????????...</option>
                            <option value='1'>???</option>
                            <option value='0'>???</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.rolecode} onChange={this.changeRolecodeHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.rolecodeformat}</div>    
                    </div>
                    <div className="form-group">
                        <label>???????????????:</label>
                        <select className="text-secondary form-control" style={{fontSize:"12px"}} value={this.state.isforbidden} onChange={this.changeIsforbiddenHandler}>
                            <option value=''>????????????????????????...</option>
                            <option value='1'>???</option>
                            <option value='0'>???</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>??????????????????:</label>
                        <select className="text-secondary form-control" style={{fontSize:"12px"}} value={this.state.isdefault} onChange={this.changeIsdefaultHandler}>
                            <option value=''>???????????????????????????...</option>
                            <option value='1'>???</option>
                            <option value='0'>???</option>
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm btn-outline-success" onClick={this.editRole}>??????</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>??????</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditRoleComponent