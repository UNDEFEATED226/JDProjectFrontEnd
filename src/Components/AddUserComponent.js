import React from 'react'
import UserService from '../Service/UserService';

class addUserComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:'',
            userid:'',
            loginname:'',
            password:'',
            realname:'',
            orgid:'',
            isdeleted:'',
            email:'',
            sex:'',
            comment:'',
            createtime:'',
            updatetime:'',
            userstatus:'',
            usergroupid:'',
            tenantid:'',
            istenantadmin:'',
            isforbidden:'',
            fullparentid:'',
            mobile:'',
            loginnameformat:'',
            passwordformat:'',
            usergroupidformat:''
        }
        this.changeRealnameHandler=this.changeRealnameHandler.bind(this);
        this.changeLoginnameHandler=this.changeLoginnameHandler.bind(this);
        this.changePasswordHandler=this.changePasswordHandler.bind(this);
        this.changeOrgidHandler=this.changeOrgidHandler.bind(this);
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.changeSexHandler=this.changeSexHandler.bind(this);
        this.changeCommentHandler=this.changeCommentHandler.bind(this);
        this.changeUserstatusHandler=this.changeUserstatusHandler.bind(this);
        this.changeUsergroupidHandler=this.changeUsergroupidHandler.bind(this);
        this.changeTenantidHandler=this.changeTenantidHandler.bind(this);
        this.changeFullparentidHandler=this.changeFullparentidHandler.bind(this);
        this.changeMobileHandler=this.changeMobileHandler.bind(this);
        this.changeIstenantAdminHandler=this.changeIstenantAdminHandler.bind(this);
        this.changeIsforbiddenHandler=this.changeIsforbiddenHandler.bind(this);
        this.changeIsdeletedHandler=this.changeIsdeletedHandler.bind(this);
        this.saveUser=this.saveUser.bind(this);
    }
    changeRealnameHandler=(event)=>{
        this.setState({realname:event.target.value});
    }
    changeLoginnameHandler=(event)=>{
        this.setState({loginname:event.target.value});
    }
    changePasswordHandler=(event) =>{
        this.setState({password: event.target.value});
    }
    changeOrgidHandler=(event) =>{
        this.setState({orgid: event.target.value});
    }
    changeEmailHandler=(event) =>{
        this.setState({email: event.target.value});
    }
    changeSexHandler=(event) =>{
        this.setState({sex: event.target.value});
    }
    changeCommentHandler=(event) =>{
        this.setState({comment: event.target.value});
    }
    changeUserstatusHandler=(event) =>{
        this.setState({userstatus: event.target.value});
    }
    changeUsergroupidHandler=(event) =>{
        this.setState({usergroupid: event.target.value});
   }
   changeTenantidHandler=(event) =>{
       this.setState({tenantid:event.target.value});
   }
    changeFullparentidHandler=(event) =>{
        this.setState({fullparentid: event.target.value});
    }
    changeMobileHandler=(event) =>{
        this.setState({mobile: event.target.value});
    }
    changeIstenantAdminHandler=(event) =>{
        this.setState({istenantadmin:event.target.value});
    }
    changeIsforbiddenHandler=(event) =>{
        this.setState({isforbidden:event.target.value});
    }
    changeIsdeletedHandler=(event) =>{
        this.setState({isdeleted:event.target.value})
    }
    saveUser = (u) => {
        u.preventDefault();
        let user = {id:this.state.id,userid:this.state.userid,loginname:this.state.loginname,
            password:this.state.password,realname:this.state.realname,orgid:this.state.orgid,
            isdeleted:this.state.isdeleted,email:this.state.email,sex:this.state.sex,comment:this.state.comment,
            createtime:this.state.createtime,updatetime:this.state.updatetime,userstatus:this.state.userstatus,
            usergroupid:this.state.usergroupid,tenantid:this.state.tenantid,istenantadmin:this.state.istenantadmin,isforbidden:this.state.isforbidden,fullparentid:this.state.fullparentid
            ,mobile:this.state.mobile};
            this.setState({loginnameformat:''});
            this.setState({passwordformat:''});
            this.setState({usergroupidformat:''});
            UserService.addUser(user).then(res => {
                this.props.history.push("/userlist")}).catch(err =>{
                    if(this.state.loginname === ''){
                        this.setState({loginnameformat:"登录名不能为空:1-64长度"});
                    }
                    if(this.state.password ==='' || this.state.password.length<8 || this.state.password.length >64){
                        this.setState({passwordformat:"密码不能为空:8-64长度"});
                    }
                    if(isNaN(this.state.usergroupid) && this.state.usergroupid !== ''){
                        this.setState({usergroupidformat:"输入为纯数字:不能包含字符"})
                    }
                });
    }

    cancel(){
        this.props.history.push("/userlist");
    }
    render(){
        return(
            <div>
            <div className="container">
                <div className="row">
                 <div className="card col-md-6 offset-md-3 offset-md-3">
                  <br></br>
                   <h3 className="text-center">添加新用户</h3>
                    <div className="card-body">
                    <form>
                    <div className="form-group">
                        <label>登陆用户名:</label>
                        <input placeholder="请输入登陆用户名..." className="form-control" value={this.state.loginname} onChange={this.changeLoginnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.loginnameformat}</div>
                    </div>  
                    <div className="form-group">
                        <label>登录密码:</label>
                        <input placeholder="请输入登录密码..." className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.passwordformat}</div>
                    </div>       
                    <div className="form-group">
                        <label>名字:</label>
                        <input placeholder="请输入名字..." className="form-control" value={this.state.realname} onChange={this.changeRealnameHandler}/>
                    </div>
                    <div className="form-group">
                        <label>组织id:</label>
                        <input placeholder="请输入组织id..." className="form-control" value={this.state.orgid} onChange={this.changeOrgidHandler}/>
                    </div>
                    <div className="form-group">
                        <label>是否已删除:</label>
                        <select className="form-control" onClick={this.changeIsdeletedHandler}>
                        <option defaultValue>请选择是否已删除</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>邮箱:</label>
                        <input placeholder="请输入邮箱..." className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                    </div>
                    <div className="form-group">
                        <label>性别:</label>
                        <select className="form-control" onClick={this.changeSexHandler}>
                        <option defaultValue>请选择性别</option>
                        <option value="1">男</option>
                        <option value="0">女</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>备注:</label>
                        <input placeholder="请输入备注..." className="form-control" value={this.state.comment} onChange={this.changeCommentHandler}/>
                    </div>
                    <div className="form-group">
                        <label>用户状态:</label>
                        <input placeholder="请输入用户状态..." className="form-control" value={this.state.userstatus} onChange={this.changeUserstatusHandler}/>
                    </div>
                    <div className="form-group">
                        <label>用户分组id:</label>
                        <input placeholder="请输入用户分组id..." className="form-control" value={this.state.usergroupid} onChange={this.changeUsergroupidHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.usergroupidformat}</div>
                    </div>
                    <div className="form-group">
                        <label>租户id:</label>
                        <input placeholder="请输入租户id..." className="form-control" value={this.state.tenantid} onChange={this.changeTenantidHandler}/>
                    </div>
                    <div className="form-group">
                        <label>是否为租户管理员:</label>
                        <select className="form-control" onClick={this.changeIstenantAdminHandler}>
                        <option defaultValue value="0">否</option>
                        <option value="1">是</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>是否被禁用:</label>
                        <select className="form-control" onClick={this.changeIsforbiddenHandler}>
                        <option defaultValue value="0">否</option>
                        <option value="1">是</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>组织全路径:</label>
                        <input placeholder="请输入组织全路径..." className="form-control" value={this.state.fullparentid} onChange={this.changeFullparentidHandler}/>
                    </div>
                    <div className="form-group">
                        <label>手机号:</label>
                        <input placeholder="请输入手机号..." className="form-control" value={this.state.mobile} onChange={this.changeMobileHandler}/>
                    </div>
                                 <button className="btn btn-success" onClick={this.saveUser}>保存</button>
                                 <button className="btn btn-danger text-right" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                             </form>
                         </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default addUserComponent