import React from 'react'
import OrganizationService from '../Service/OrganizationService';
import RoleService from '../Service/RoleService';
import TenantService from '../Service/TenantService';
import UserRoleService from '../Service/UserRoleService';
import UserService from '../Service/UserService';

class addUserComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loginname:'',
            loginnameformat:'',
            password:'',
            passwordformat:'',
            passwordconfirm:'',
            passwordconfirmformat:'',
            tenantid:'',
            tenantidformat:'',
            tenants:[],
            roles:[],
            roleid:1,
            tenantname:''
        }
        this.changeLoginnameHandler=this.changeLoginnameHandler.bind(this);
        this.changePasswordHandler=this.changePasswordHandler.bind(this);
        this.changePasswordconfirmHandler=this.changePasswordconfirmHandler.bind(this);
        this.changeTenantidHandler=this.changeTenantidHandler.bind(this);
        this.changeRoleidHandler=this.changeRoleidHandler.bind(this);
        this.changeTenantnameHandler=this.changeTenantnameHandler.bind(this);
        this.addTenant=this.addTenant.bind(this);
        this.saveUser=this.saveUser.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    componentDidMount(){
        TenantService.findAllTenant().then((res) =>{
            this.setState({tenants:res.data});
        });
        RoleService.findAllRole().then(res=>{
            this.setState({roles:res.data});
        });
    }
    changeLoginnameHandler=(event)=>{
        let value = event.target.value;
        value = value.replace(/[^A-Za-z0-9+&@#/%?=~_|!:,.;$^*()-{}'"]/ig,'');
        this.setState({loginname:value});
    }
    changePasswordHandler=(event) =>{
        let value = event.target.value;
        value = value.replace(/[^A-Za-z0-9+&@#/%?=~_|!:,.;$^*()-{}'"]/ig,'');
        this.setState({password: value});
    }
    changePasswordconfirmHandler=(event) =>{
        let value = event.target.value;
        value = value.replace(/[^A-Za-z0-9+&@#/%?=~_|!:,.;$^*()-{}'"]/ig,'');
        this.setState({passwordconfirm:value});
    }
    changeTenantidHandler=(event) =>{
        this.setState({tenantid: event.target.value});
    }
    changeRoleidHandler=(event)=>{
        this.setState({roleid:event.target.value});
    }
    changeTenantnameHandler=(event)=>{
        this.setState({tenantname:event.target.value});
    }

    saveUser = (u) => {
        u.preventDefault();
        this.setState({
            loginnameformat:'',
            passwordformat:'',
            passwordconfirmformat:'',
            tenantidformat:''
        });
        var bool = false;
        if(this.state.loginname.trim()==='' || this.state.loginname.length>64){
            bool = true;
            this.setState({loginnameformat:"??????????????????1-64???"});     
        }
        if(this.state.password.trim()==='' || this.state.password.length <8 || this.state.password.length>64){
            bool = true;
            this.setState({passwordformat:"?????????????????????8-64???"});
        }
        if(this.state.password !== this.state.passwordconfirm){
            bool = true;
            this.setState({passwordconfirmformat:"???????????????????????????,???????????????"});
        }   
        if(this.state.tenantid === ''){
            bool = true; 
            this.setState({tenantidformat:'???????????????...'});
        }
        if(bool){
            throw new Error("INPUT ERROR");
        }
        let user = {id:'',userid:'',loginname:this.state.loginname,
            password:this.state.password,realname:'',orgid:'',
            isdeleted:0,email:'',sex:'',comment:'',
            createtime:'',updatetime:'',userstatus:'',
            usergroupid:'',tenantid:this.state.tenantid,istenantadmin:0,isforbidden:0,fullparentid:''
            ,mobile:''};
            UserService.addUser(user).then(res=>{
                let user = res.data;
                if(this.state.roleid !== ''){
                    this.addUserRole(this.state.roleid,user.id);
                }
                this.props.history.push("/userlist");
            }).catch(err =>{
                if(this.state.loginname.length>64){
                    this.setState({loginnameformat:"???????????????..."});
                }
                if(this.state.password.length<8 || this.state.password.length >256){
                    this.setState({passwordformat:"????????????????????????8-256"});
                }
                if(this.state.password !== this.state.passwordconfirm){
                    this.setState({passwordconfirmformat:"?????????????????????,???????????????..."});
                }   
            });
    }

    cancel(){
        this.props.history.goBack();
    }

    addTenant(){
        let tenant= {id:'',name:this.state.tenantname,businessassignment:'',isdeleted:0,createtime:'',updatetime:'',adminuserid:''};
        TenantService.addTenant(tenant).then(res=>{
            let ten = res.data;
            let org = {id:'',orgname:this.state.tenantname,parentorgid:'',orglevel:'',orgtype:'',orgtypename:'',orgcatlog:'',baseorgcode:'',tenantid:ten.id,tenantname:this.state.tenantname,updatetime:''
            ,createtime:'',isdeleted:0,fullparentid:'',ishavechild:''};
            OrganizationService.addOrganization(org);
        })
        TenantService.findAllTenant().then(res=>{
            this.setState({tenants:res.data});
        });
    }

    addUserRole(roleid,userid){
        let userrole = {id:'',userid:userid,roleid:roleid,isdeleted:0,createtime:'',updatetime:''};
        UserRoleService.addUserRole(userrole).catch(err=>{console.error('ERROR WHEN CREATING USERROLE')});
    }

    render(){
        return(
            <div style={{marginTop:"5%"}}>
            <div className="modal fade" id="modal1" tabIndex="-1" role="dialog" aria-labelledby="label1" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                     <div className="modal-header">
                        <h5 id="label1" style={{color:"#666669"}}>????????????</h5>
                        <button className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                 <  div className="modal-body">
                     <label style={{color:"#666669"}}>????????????</label>
                     <input className="form-control" placeholder='????????????????????????????????????...' value={this.state.tenantname} onChange={this.changeTenantnameHandler} style={{marginTop:"1.5%"}}/>
                     <label style={{marginTop:"1.5%",color:"#666669"}}>????????????</label>
                     <input className="form-control" value={this.state.tenantname}  disabled onChange={this.changeTenantnameHandler} style={{marginTop:"1.5%"}}/>
                 </div>
             <div className="modal-footer">
            <button type="button" className="btn btn-outline-success" onClick={this.addTenant} disabled={this.state.tenantname==='' ? true : false} data-dismiss="modal" style={{marginRight:"25px"}}>??????</button>
            <button type="button" className="btn btn-outline-danger" data-dismiss="modal">??????</button>
            </div>
            </div>
            </div>
         </div>
                 <div className="card bg-light mx-auto" style={{width:"30rem",fontSize:"12px",color:"#666669"}}>
                   <h5 className="card-header text-center">????????????</h5>
                    <div className="card-body">
                    <form>
                    <div className="form-group">
                    <label style={{color:"#666669"}}>*??????:</label>
                    <select className="form-control" style={{fontSize:"12px",color:"#666669"}} value={this.state.tenantid} onChange={this.changeTenantidHandler}>
                        <option value=''>???????????????...</option>
                       {
                             this.state.tenants.map(
                                tenant =>
                             <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                             )
                     }
                    </select>
                    <div style={{color:"#f44e3b"}}>{this.state.tenantidformat}</div>
                    </div>
                    <div className="form-group">
                        <button className="btn form-control btn-sm btn-dark" data-toggle="modal" data-target="#modal1">?????????????????????,???????????????</button>
                    </div>
                    <div className="form-group">
                        <label style={{color:"#666669"}}>*???????????????:</label>
                        <input className="form-control" style={{fontSize:"12px"}} placeholder="????????????????????????..." value={this.state.loginname} onChange={this.changeLoginnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.loginnameformat}</div>
                    </div>  
                    <div className="form-group">
                        <label style={{color:"#666669"}}>*????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.passwordformat}</div>
                    </div>       
                    <div className="form-group">
                        <label style={{color:"#666669"}}>*??????????????????:</label>
                        <input placeholder="???????????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.passwordconfirm} onChange={this.changePasswordconfirmHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.passwordconfirmformat}</div>
                    </div>       
                    <div className="form-group">
                    <label style={{color:"#666669"}}>??????(????????????????????????):</label>
                    <select className="form-control" value={this.state.roleid}  onChange={this.changeRoleidHandler} style={{fontSize:"12px",color:"grey"}}>
                       {
                             this.state.roles.map(
                                role =>
                             <option key={role.id} value={role.id}>{role.rolename}</option>
                             )
                     }
                    </select>
                    </div>
                            <div className="text-center">
                                 <button className="btn btn-sm btn-outline-success" onClick={this.saveUser}>??????</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={this.cancel} style={{marginLeft:"80px"}}>??????</button>
                                </div>
                             </form>
                         </div>
                    </div>
                </div>
        )
    }
}

export default addUserComponent