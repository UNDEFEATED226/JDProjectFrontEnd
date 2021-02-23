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
        this.changeIsdeletedHandler=this.changeIsdeletedHandler.bind(this);
        this.changeIstenantadminHandler=this.changeIstenantadminHandler.bind(this);
        this.changeIsforbiddenHandler=this.changeIsforbiddenHandler.bind(this);
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
        this.setState({loginname:event.target.value});
    }
    changePasswordHandler=(event) =>{
        this.setState({password:event.target.value});
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
    changeIsdeletedHandler=(event)=>{
        this.setState({isdeleted:event.target.value});
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
            mobileformat:''
        });
        let user= {id:this.state.id,userid:this.state.userid,loginname:this.state.loginname,
            password:this.state.password,realname:this.state.realname,orgid:this.state.orgid,
            email:this.state.email,sex:this.state.sex,comment:this.state.comment,
            createtime:this.state.createtime,updatetime:this.state.updatetime,userstatus:this.state.userstatus,
            usergroupid:this.state.usergroupid,fullparentid:this.state.fullparentid,tenantid:this.state.tenantid
            ,mobile:this.state.mobile,isdeleted:this.state.isdeleted,isforbidden:this.state.isforbidden,istenantadmin:this.state.istenantadmin};
        UserService.editUser(this.state.id,user).then(res =>{
            this.props.history.push("/userlist");
        }).catch(err => {
            if(this.state.loginname === ''||this.state.loginname.length>64){
                this.setState({loginnameformat:"登录用户名不能为空:1-64长度"});
            }
            if(this.state.password ==='' || this.state.password.length<8 || this.state.password.length >256){
                this.setState({passwordformat:"登录密码不能为空:8-256长度"});
                }
            if(this.state.realname!=null && this.state.realname!=='' && this.state.realname.length>64){
                this.setState({realnameformat:"名字过长..."});
            }
            var pattern= /^([a-zA-Z0-9]+[_]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            var strEmail=pattern.test(this.state.email);
            if(this.state.email!=null && this.state.email!=='' && (this.state.email.length>64||!strEmail)){
                this.setState({emailformat:"邮箱过长或格式不正确..."});
            }
            if(this.state.usergroupid!=null && this.state.comment!==''&&this.state.comment.length>256){
                this.setState({commentformat:"备注过长..."});
            }
            if(this.state.userstatus!=null && this.state.userstatus!==''&& this.state.userstatus.length>64){
                this.setState({userstatusformat:"用户状态过长..."});
            }
            if(this.state.usergroupid!=null && this.state.usergroupid!==''){
                if(isNaN(this.state.usergroupid)||this.state.usergroupid.length>20){
                     this.setState({usergroupidformat:"用户分组ID只能为长度不超过20的纯数字..."});
                 }
            }
            if(this.state.fullparentid!=null && this.state.fullparentid!=='' && this.state.fullparentid.length>256){
                this.setState({fullparentidformat:"组织全路径过长..."});
            }
            if(this.state.mobile!=null && this.state.mobile !=='' && this.state.mobile.length>20){
                this.setState({mobileformat:"手机号过长..."});
            }
        });
    }

    cancel(){
        this.props.history.push('/userlist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card f-size bg-light mx-auto" style={{width:"30rem"}}>
                 <h5 className="card-header text-center font-weight-bold text-secondary">编辑用户资料</h5>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">登录用户名:</label>
                        <input placeholder="请输入登录用户名..." style={{fontSize:"12px"}} className="form-control" value={this.state.loginname} onChange={this.changeLoginnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.loginnameformat}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">登录密码:</label>
                        <input placeholder="请输入登录密码..." style={{fontSize:"12px"}} className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.passwordformat}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">名字:</label>
                        <input placeholder="请输入名字..." style={{fontSize:"12px"}} className="form-control" value={this.state.realname} onChange={this.changeRealnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.realnameformat}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">组织:</label>
                        <select className="form-control" style={{fontSize:"12px"}} onChange={this.changeOrgidHandler}>
                        <option defaultValue value={this.state.orgid}>请选择组织:</option>
                        {
                            this.state.organizations.map(
                                organization => 
                                <option value={organization.id}>{organization.orgname}</option>
                            )
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">邮箱:</label>
                        <input placeholder="请输入邮箱..." style={{fontSize:"12px"}} className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.emailformat}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">性别:</label>
                        <select className="form-control" style={{fontSize:"12px"}} onChange={this.changeSexHandler}>
                            <option defaultValue value={this.state.sex}>请选择性别</option>
                            <option value="1">男</option>
                            <option value="0">女</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">备注:</label>
                        <input placeholder="请输入备注..." style={{fontSize:"12px"}} className="form-control" value={this.state.comment} onChange={this.changeCommentHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.commentformat}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">用户状态:</label>
                        <input placeholder="请输入用户状态..." style={{fontSize:"12px"}} className="form-control" value={this.state.userstatus} onChange={this.changeUserstatusHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.userstatusformat}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">用户分组ID:</label>
                        <input placeholder="请输入用户分组ID..." style={{fontSize:"12px"}} className="form-control" value={this.state.usergroupid} onChange={this.changeUsergroupidHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.usergroupidformat}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">组织全路径:</label>
                        <input placeholder="请输入组织全路径..." style={{fontSize:"12px"}} className="form-control" value={this.state.fullparentid} onChange={this.changeFullparentidHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.fullparentidformat}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">手机号:</label>
                        <input placeholder="请输入手机号..." style={{fontSize:"12px"}} className="form-control" value={this.state.mobile} onChange={this.changeMobileHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.mobileformat}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">是否已删除</label>
                        <select className="form-control" style={{fontSize:"12px"}} onChange={this.changeIsdeletedHandler}>
                            <option defaultValue value={this.state.isdeleted}>请选择是否已删除</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">是否为租户管理员</label>
                        <select className="form-control" style={{fontSize:"12px"}} onChange={this.changeIstenantadminHandler}>
                            <option defaultValue value={this.state.istenantadmin}>请选择是否为租户管理员</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">是否被禁用</label>
                        <select className="form-control" style={{fontSize:"12px"}} onChange={this.changeIsforbiddenHandler}>
                            <option defaultValue value={this.state.isforbidden}>请选择是否被禁用</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-sm green-btn text-white font-weight-bold" onClick={this.editUser}>保存</button>
                    <button className="btn btn-sm red-btn text-white font-weight-bold" onClick={this.cancel.bind(this)} style={{marginLeft:"80px"}}>取消</button>
                    </div>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default EditUserComponent