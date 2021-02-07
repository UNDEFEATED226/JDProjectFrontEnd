import React from 'react'
import AuthService from '../Service/AuthService'

class AddAuthComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authname:'',
            authnameformat:''
        }
        this.changeAuthnameHandler=this.changeAuthnameHandler.bind(this);
        this.saveAuth=this.saveAuth.bind(this);
    }

    changeAuthnameHandler=(event)=>{
        this.setState({authname:event.target.value});
    }

    saveAuth=(a) =>{
        a.preventDefault();
        this.setState({authnameformat:''});
        let auth = {id:'',authname:this.state.authname,description:'',resid:'',isdeleted:0,
        createtime:'',updatetime:''};
        AuthService.addAuth(auth).then(res =>{
            this.props.history.push("/authlist");
        }).catch(err => {
            if(this.state.authname.length>64){
                this.setState({authnameformat:"权限名称过长..."});
            }
        })
    }

    cancel(){
        this.props.history.push("/authlist");
    }

    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                 <h3 className="card-header text-center font-weight-bold text-secondary">添加权限</h3>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">权限名称:</label>
                        <input placeholder="请输入权限名称..." className="form-control" value={this.state.authname} onChange={this.changeAuthnameHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.authnameformat}</div>    
                    </div>
                    <button className="btn btn-success" onClick={this.saveAuth}>保存</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddAuthComponent