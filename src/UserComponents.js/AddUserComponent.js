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
    changeOrgidHandler=(event) =>{
        this.setState({orgid: event.target.value});
    }
    saveUser = (u) => {
        u.preventDefault();
        this.setState({
            loginnameformat:'',
            passwordformat:'',
            passwordconfirmformat:'',
        });
        var bool = false;
        if(this.state.loginname.trim()==='' || this.state.loginname.length>64){
            bool = true;
            this.setState({loginnameformat:"登录名长度为1-64位"});     
        }
        if(this.state.password.trim()==='' || this.state.password.length <8 || this.state.password.length>64){
            bool = true;
            this.setState({passwordformat:"登录密码长度为8-64位"});
        }
        if(this.state.password !== this.state.passwordconfirm){
            bool = true;
            this.setState({passwordconfirmformat:"两次密码输入不一致,请重新输入"});
        }   
        if(bool){
            throw new Error("INPUT ERROR");
        }
        let user = {id:'',userid:'',loginname:this.state.loginname,
            password:this.state.password,realname:'',orgid:this.state.orgid,
            isdeleted:0,email:'',sex:'',comment:'',
            createtime:'',updatetime:'',userstatus:'',
            usergroupid:'',tenantid:'',istenantadmin:0,isforbidden:0,fullparentid:''
            ,mobile:''};
            UserService.addUser(user).then(res => {
                this.props.history.push("/userlist")}).catch(err =>{
                    if(this.state.loginname.length>64){
                        this.setState({loginnameformat:"登录名过长..."});
                    }
                    if(this.state.password.length<8 || this.state.password.length >256){
                        this.setState({passwordformat:"登录密码长度应为8-256"});
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
                 <div className="card f-size bg-light mx-auto" style={{width:"30rem"}}>
                   <h5 className="card-header text-center text-secondary font-weight-bold">添加用户</h5>
                    <div className="card-body">
                    <form>
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">登陆用户名:</label>
                        <input className="form-control" style={{fontSize:"12px"}} placeholder="请输入登陆用户名..." value={this.state.loginname} onChange={this.changeLoginnameHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.loginnameformat}</div>
                    </div>  
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">登录密码:</label>
                        <input placeholder="请输入登录密码..." style={{fontSize:"12px"}} className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.passwordformat}</div>
                    </div>       
                    <div className="form-group">
                        <label className="text-secondary font-weight-bold">登录密码确认:</label>
                        <input placeholder="请再次输入登录密码..." style={{fontSize:"12px"}} className="form-control" value={this.state.passwordconfirm} onChange={this.changePasswordconfirmHandler}/>
                        <div style={{color:"#f44e3b"}}>{this.state.passwordconfirmformat}</div>
                    </div>       
                    <div className="form-group">
                    <label className="text-secondary font-weight-bold">组织:</label>
                    <select className="form-control" style={{fontSize:"12px",color:"grey"}} value={this.state.orgid} onChange={this.changeOrgidHandler}>
                        <option defaultValue value=''>请选择组织</option>
                       {
                             this.state.organizations.map(
                                organization =>
                             <option value={organization.id}>{organization.orgname}</option>
                             )
                     }
                    </select>
                    </div>
                            <div className="text-center">
                                 <button className="btn btn-sm green-btn text-white font-weight-bold" onClick={this.saveUser}>保存</button>
                                <button className="btn btn-sm red-btn font-weight-bold text-white" onClick={this.cancel} style={{marginLeft:"80px"}}>取消</button>
                                </div>
                             </form>
                         </div>
                    </div>
                </div>
        )
    }
}

export default addUserComponent