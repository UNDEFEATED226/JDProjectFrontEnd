import React from 'react'
import OrganizationService from '../Service/OrganizationService';
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
            orgid:'',
            orgidformat:'',
            organizations:[]
        }
        this.changeLoginnameHandler=this.changeLoginnameHandler.bind(this);
        this.changePasswordHandler=this.changePasswordHandler.bind(this);
        this.changePasswordconfirmHandler=this.changePasswordconfirmHandler.bind(this);
        this.changeOrgidHandler=this.changeOrgidHandler.bind(this);
        this.saveUser=this.saveUser.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    componentDidMount(){
        OrganizationService.findAllOrganization().then((response) =>{
            this.setState({organizations:response.data});
        })
    }
    changeLoginnameHandler=(event)=>{
        this.setState({loginname:event.target.value});
    }
    changePasswordHandler=(event) =>{
        this.setState({password: event.target.value});
    }
    changePasswordconfirmHandler=(event) =>{
        this.setState({passwordconfirm:event.target.value});
    }
    changeOrgidHandler=(event) =>{
        this.setState({orgid: event.target.value});
    }
    saveUser = (u) => {
        u.preventDefault();
        this.setState({
            loginnameformat:'',
            passwordformat:'',
            passwordconfirmformat:'',
            orgidformat:''
        });
        let user = {id:'',userid:'',loginname:this.state.loginname,
            password:this.state.password,realname:'',orgid:this.state.orgid,
            isdeleted:0,email:'',sex:'',comment:'',
            createtime:'',updatetime:'',userstatus:'',
            usergroupid:'',tenantid:'',istenantadmin:0,isforbidden:0,fullparentid:''
            ,mobile:''};
            if(this.state.password !== this.state.passwordconfirm){
                this.setState({passwordconfirmformat:"两次密码输入不一致,请重新输入"});
                throw new Error("Password confirmation failure!");
            }   
            UserService.addUser(user).then(res => {
                this.props.history.push("/userlist")}).catch(err =>{
                    if(this.state.loginname === ''||this.state.loginname.length>64){
                        this.setState({loginnameformat:"登录名不能为空:1-64长度"});
                    }
                    if(this.state.password ==='' || this.state.password.length<8 || this.state.password.length >256){
                        this.setState({passwordformat:"密码不能为空:8-256长度"});
                    }
                    if(this.state.orgid === ''){
                        this.setState({orgidformat:"请选择组织,如无可选项请先添加组织..."});
                    }
                    if(this.state.password !== this.state.passwordconfirm){
                        this.setState({passwordconfirmformat:"两次密码输入不一致,请重新输入"});
                    }   
                });
    }

    cancel(){
        this.props.history.push("/userlist");
    }

    render(){
        return(
            <div style={{marginTop:"5%"}}>
                 <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                   <h3 className="card-header text-center text-secondary font-weight-bold">添加用户</h3>
                    <div className="card-body">
                    <form>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">登陆用户名:</label>
                        <input placeholder="请输入登陆用户名..." className="form-control" value={this.state.loginname} onChange={this.changeLoginnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.loginnameformat}</div>
                    </div>  
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">登录密码:</label>
                        <input placeholder="请输入登录密码..." className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.passwordformat}</div>
                    </div>       
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">登录密码确认:</label>
                        <input placeholder="请再次输入登录密码..." className="form-control" value={this.state.passwordconfirm} onChange={this.changePasswordconfirmHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.passwordconfirmformat}</div>
                    </div>       
                    <div className="form-group">
                    <label className="text-secondary font-weight-bold">组织:</label>
                    <select className="form-control" value={this.state.orgid} onChange={this.changeOrgidHandler}>
                        <option className="text-secondary" defaultValue value=''>请选择组织</option>
                       {
                             this.state.organizations.map(
                                organization =>
                             <option value={organization.id}>{organization.orgname}</option>
                             )
                     }
                    </select>
                    <div style={{color:"#f44e3b"}}>{this.state.orgidformat}</div>
                    </div>
                                 <button className="btn btn-success" onClick={this.saveUser}>保存</button>
                                <button className="btn btn-danger text-right" onClick={this.cancel} style={{marginLeft:"15px"}}>取消</button>
                             </form>
                         </div>
                    </div>
                </div>
        )
    }
}

export default addUserComponent