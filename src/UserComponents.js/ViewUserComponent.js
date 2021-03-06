import React from 'react'
import moment from 'moment'
import UserService from '../Service/UserService'

class ViewUserComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            user:{},
            sex:'',
            istenantadmin:'',
            isforbidden:'',
            isdeleted:''
        }
    }

    componentDidMount(){
        UserService.findById(this.state.id).then(res => {
            this.setState({user:res.data});
            if(this.state.user.sex===1){
                this.setState({sex:"男"})
            }
            if(this.state.user.sex===0){
                this.setState({sex:"女"})
            }
            if(this.state.user.istenantadmin===1){
                this.setState({istenantadmin:"是"})
            }
            if(this.state.user.istenantadmin===0){
                this.setState({istenantadmin:"否"})
            }
            if(this.state.user.isforbidden===1){
                this.setState({isforbidden:"已禁用"})
            }
            if(this.state.user.isforbidden===0){
                this.setState({isforbidden:"未禁用"})
            }
            if(this.state.user.isdeleted===1){
                this.setState({isdeleted:"已删除"})
            }
            if(this.state.user.isdeleted===0){
                this.setState({isdeleted:"未删除"})
            }
        })
    }

    render(){
        return(
            <div style={{marginTop:"2.5%",fontSize:"12px",color:"#666669"}}>     
                  <button className="btn btn-outline-dark" onClick={e=>{this.props.history.goBack()}} style={{marginLeft:'28.5%'}}>返回</button>
              <div className="card bg-light mx-auto" style={{width:"30rem",marginTop:'2.5%'}}>
                <h5 className="text-center card-header">用户详情</h5>
                <div className="card-body" style={{marginLeft:"5%"}}>
                    <div className="row">
                        <label>ID:</label>
                        <div>{this.state.user.id}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>用户编号:</label>
                        <div>{this.state.user.userid}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>登录用户名:</label>
                        <div>{this.state.user.loginname}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>登录密码:</label>
                        <div>{this.state.user.password}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>名字:</label>
                        <div>{this.state.user.realname}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>组织ID:</label>
                        <div>{this.state.user.orgid}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>组织名称:</label>
                        <div style={{color: this.state.user.orgname==='组织不存在或已删除' ? "red":undefined}}>{this.state.user.orgname}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>邮箱:</label>
                        <div>{this.state.user.email}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>性别:</label>
                        <div>{this.state.sex}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>备注:</label>
                        <div>{this.state.user.comment}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>创建时间:</label>
                        <div>{moment(this.state.user.createtime).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>更新时间:</label>
                        <div>{moment(this.state.user.updatetime).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>用户状态:</label>
                        <div>{this.state.user.userstatus}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>用户分组ID:</label>
                        <div>{this.state.user.usergroupid}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>租户ID:</label>
                        <div>{this.state.user.tenantid}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>租户名称:</label>
                        <div style={{color: this.state.user.tenantname==='租户不存在或已删除' ? "red":undefined}}>{this.state.user.tenantname}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>是否是租户管理员:</label>
                        <div>{this.state.istenantadmin}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>是否被禁用:</label>
                        <div>{this.state.isforbidden}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>组织全路径:</label>
                        <div>{this.state.user.fullparentid}</div>
                    </div>
                    <div className="row" style={{marginTop:"5px"}}>
                        <label>手机号:</label>
                        <div>{this.state.user.mobile}</div>
                    </div>
                </div>
              </div>
              </div>
        )
    }
}

export default ViewUserComponent