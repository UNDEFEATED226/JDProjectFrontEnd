import React from 'react'
import OrganizationService from '../Service/OrganizationService';
import UserService from '../Service/UserService'

class EditUserComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            userid:'',
            loginname:'',
            loginnameformat:'',
            password:'',
            passwordformat:'',
            realname:'',
            realnameformat:'',
            orgid:'',
            orgidformat:'',
            email:'',
            emailformat:'',
            sex:'',
            comment:'',
            commentformat:'',
            createtime:'',
            updatetime:'',
            userstatus:'',
            userstatusformat:'',
            usergroupid:'',
            usergroupidformat:'',
            fullparentid:'',
            fullparentidformat:'',
            mobile:'',
            mobileformat:'',
            isdeleted:'',
            istenantadmin:'',
            isforbidden:'',
            organizations:[]
        }
        this.changeLoginnameHandler=this.changeLoginnameHandler.bind(this);
        this.changePasswordHandler=this.changePasswordHandler.bind(this);
        this.changeRealnameHandler=this.changeRealnameHandler.bind(this);
        this.changeOrgidHandler=this.changeOrgidHandler.bind(this);
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.changeSexHandler=this.changeSexHandler.bind(this);
        this.changeCommentHandler=this.changeCommentHandler.bind(this);
        this.changeUserstatusHandler=this.changeUserstatusHandler.bind(this);
        this.changeUsergroupidHandler=this.changeUsergroupidHandler.bind(this);
        this.changeFullparentidHandler=this.changeFullparentidHandler.bind(this);
        this.changeMobileHandler=this.changeMobileHandler.bind(this);
        this.changeIstenantadminHandler=this.changeIstenantadminHandler.bind(this);
        this.changeIsforbiddenHandler=this.changeIsforbiddenHandler.bind(this);
        this.cancel=this.cancel.bind(this);
        this.editUser=this.editUser.bind(this)
    }
    
    componentDidMount(){
        UserService.findById(this.state.id).then(res => {
           let user=res.data;
           this.setState({
               userid:user.userid,
               loginname:user.loginname,
               password:user.password,
               realname:user.realname,
               orgid:user.orgid,
               email:user.email,
               sex:user.sex,
               comment:user.comment,
               createtime:user.createtime,
               updatetime:user.updatetime,
               userstatus:user.userstatus,
               usergroupid:user.usergroupid,
               fullparentid:user.fullparentid,
               mobile:user.mobile,
               isdeleted:user.isdeleted,
               istenantadmin:user.istenantadmin,
               isforbidden:user.isforbidden,
               tenantid:user.tenantid
           });
        });
        OrganizationService.findAllOrganization().then(res => {
            this.setState({organizations:res.data});
        })
    }

    changeLoginnameHandler=(event) =>{
        let value = event.target.value;
        value = value.replace(/[^A-Za-z0-9+&@#/%?=~_|!:,.;$^*()-{}'"]/ig,'');
        this.setState({loginname:value});
    }
    changePasswordHandler=(event) =>{
        let value = event.target.value;
        value = value.replace(/[^A-Za-z0-9+&@#/%?=~_|!:,.;$^*()-{}'"]/ig,'');
        this.setState({password:value});
    }
    changeRealnameHandler=(event)=>{
        this.setState({realname:event.target.value});
    }
    changeOrgidHandler=(event)=>{
        this.setState({orgid:event.target.value});
    }
    changeEmailHandler=(event)=>{
        this.setState({email:event.target.value});
    }
    changeSexHandler=(event)=>{
        this.setState({sex:event.target.value});
    }
    changeCommentHandler=(event)=>{
        this.setState({comment:event.target.value});
    }
    changeUserstatusHandler=(event)=>{
        this.setState({userstatus:event.target.value});
    }
    changeUsergroupidHandler=(event)=>{
        this.setState({usergroupid:event.target.value});
    }
    changeFullparentidHandler=(event)=>{
        this.setState({fullparentid:event.target.value});
    }
    changeMobileHandler=(event)=>{
        this.setState({mobile:event.target.value});
    }
    changeIstenantadminHandler=(event)=>{
        this.setState({istenantadmin:event.target.value});
    }
    changeIsforbiddenHandler=(event)=>{
        this.setState({isforbidden:event.target.value});
    }

    editUser=(u)=>{
        u.preventDefault();
        this.setState({
            loginnameformat:'',
            passwordformat:'',
            realnameformat:'',
            emailformat:'',
            commentformat:'',
            userstatusformat:'',
            usergroupidformat:'',
            fullparentidformat:'',
            mobileformat:'',
            orgidformat:''
        });
        var bool = false;
        if(this.state.loginname.trim() === ''){
            bool = true;
            this.setState({loginnameformat:'?????????????????????...'});
        }
        if(this.state.password.trim() === ''){
            bool = true;
            this.setState({passwordformat:'????????????????????????...'});
        }
        if(this.state.orgid == null || this.state.orgid === ''){
            bool = true;
            this.setState({orgidformat:'???????????????...'});
        }
        if(bool){
            throw new Error("INPUT ERROR");
        }
        let user= {id:this.state.id,userid:this.state.userid,loginname:this.state.loginname,
            password:this.state.password,realname:this.state.realname,orgid:this.state.orgid,
            email:this.state.email,sex:this.state.sex,comment:this.state.comment,
            createtime:this.state.createtime,updatetime:this.state.updatetime,userstatus:this.state.userstatus,
            usergroupid:this.state.usergroupid,fullparentid:this.state.fullparentid,tenantid:this.state.tenantid
            ,mobile:this.state.mobile,isdeleted:this.state.isdeleted,isforbidden:this.state.isforbidden,istenantadmin:this.state.istenantadmin};
        UserService.editUser(this.state.id,user).then(res =>{
            this.props.history.push("/userlist");
        }).catch(err => {
            if(this.state.loginname.length>64){
                this.setState({loginnameformat:"?????????????????????..."});
            }
            if(this.state.password.length<8 || this.state.password.length >256){
                this.setState({passwordformat:"?????????????????????8-256..."});
                }
            if(this.state.realname!=null && this.state.realname!=='' && this.state.realname.length>64){
                this.setState({realnameformat:"????????????..."});
            }
            var pattern= /^([a-zA-Z0-9]+[_]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            var strEmail=pattern.test(this.state.email);
            if(this.state.email!=null && this.state.email!=='' && (this.state.email.length>64||!strEmail)){
                this.setState({emailformat:"??????????????????????????????..."});
            }
            if(this.state.usergroupid!=null && this.state.comment!==''&&this.state.comment.length>256){
                this.setState({commentformat:"????????????..."});
            }
            if(this.state.userstatus!=null && this.state.userstatus!==''&& this.state.userstatus.length>64){
                this.setState({userstatusformat:"??????????????????..."});
            }
            if(this.state.usergroupid!=null && this.state.usergroupid!==''){
                if(isNaN(this.state.usergroupid)||this.state.usergroupid.length>20){
                     this.setState({usergroupidformat:"????????????ID????????????????????????20????????????..."});
                 }
            }
            if(this.state.fullparentid!=null && this.state.fullparentid!=='' && this.state.fullparentid.length>256){
                this.setState({fullparentidformat:"?????????????????????..."});
            }
            if(this.state.mobile!=null && this.state.mobile !=='' && this.state.mobile.length>20){
                this.setState({mobileformat:"???????????????..."});
            }
        });
    }

    cancel(){
        this.props.history.goBack();
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%",fontSize:"12px",fontFamily:"sans-serif",color:"#666669"}}>
                <div className="card bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center" style={{color:"#666669"}}>??????????????????</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group" style={{color:"#666669"}}>
                        <label>*???????????????:</label>
                        <input placeholder="????????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.loginname} onChange={this.changeLoginnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.loginnameformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>*????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.passwordformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>??????:</label>
                        <input placeholder="???????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.realname} onChange={this.changeRealnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.realnameformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>*??????:</label>
                        <select className="text-secondary form-control" style={{fontSize:"12px"}} value={this.state.orgid} onChange={this.changeOrgidHandler}>
                        <option value=''>???????????????...</option>
                        {
                            this.state.organizations.map(
                                organization => 
                                <option key={organization.id} value={organization.id}>{organization.orgname}</option>
                            )
                        }
                        </select>
                        <div style={{color:"#f44e3b"}}>{this.state.orgidformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>??????:</label>
                        <input placeholder="???????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.emailformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>??????:</label>
                        <select className="form-control" style={{fontSize:"12px",color:"#666669"}} value={this.state.sex} onChange={this.changeSexHandler}>
                            <option value=''>???????????????</option>
                            <option value="1">???</option>
                            <option value="0">???</option>
                        </select>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>??????:</label>
                        <input placeholder="???????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.comment} onChange={this.changeCommentHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.commentformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>????????????:</label>
                        <input placeholder="?????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.userstatus} onChange={this.changeUserstatusHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.userstatusformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>????????????ID:</label>
                        <input placeholder="?????????????????????ID..." style={{fontSize:"12px"}} className="form-control" value={this.state.usergroupid} onChange={this.changeUsergroupidHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.usergroupidformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>???????????????:</label>
                        <input placeholder="????????????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.fullparentid} onChange={this.changeFullparentidHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.fullparentidformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>?????????:</label>
                        <input placeholder="??????????????????..." style={{fontSize:"12px"}} className="form-control" value={this.state.mobile} onChange={this.changeMobileHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.mobileformat}</div>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>????????????????????????:</label>
                        <select className="form-control" style={{fontSize:"12px",color:"#666669"}} value={this.state.istenantadmin} onChange={this.changeIstenantadminHandler}>
                            <option value=''>?????????????????????????????????...</option>
                            <option value="1">???</option>
                            <option value="0">???</option>
                        </select>
                    </div>
                    <div className="form-group" style={{color:"#666669"}}>
                        <label>???????????????:</label>
                        <select className="form-control" style={{fontSize:"12px",color:"#666669"}} value={this.state.isforbidden} onChange={this.changeIsforbiddenHandler}>
                            <option value=''>????????????????????????...</option>
                            <option value="1">???</option>
                            <option value="0">???</option>
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm btn-outline-success" onClick={this.editUser}>??????</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={this.cancel} style={{marginLeft:"80px"}}>??????</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditUserComponent