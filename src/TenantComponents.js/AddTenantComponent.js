import React from 'react'
import TenantService from '../Service/TenantService'

class AddTenantComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
           name:'',
           nameformat:''
        }
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.saveTenant=this.saveTenant.bind(this);
    }

    changeNameHandler=(event)=>{
        this.setState({name:event.target.value});
    }

    saveTenant=(t)=>{
        t.preventDefault();
        this.setState({nameformat:''});
        let tenant= {id:'',name:this.state.name,businessassignment:'',isdeleted:0,createtime:'',updatetime:'',adminuserid:''};
        TenantService.addTenant(tenant).then(res =>{
            this.props.history.push("/tenantlist");
        }).catch(err =>{
            if(this.state.name.length>255){
                this.setState({nameformat:"租户名称过长..."});
            }
        })
    }

    cancel(){
        this.props.history.push('/tenantlist'); 
    }
                 
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div className="card bg-light mx-auto" style={{width:"45rem"}}>
                 <h3 className="card-header text-center font-weight-bold text-secondary">添加租户</h3>
                  <div className="card-body">
                   <form>
                   <div className="form-group">
                        <label className="text-secondary font-weight-bold">租户名称:</label>
                        <input placeholder="请输入租户名称..." className="form-control" value={this.state.name} onChange={this.changeNameHandler}/> 
                        <div style={{color:"#f44e3b"}}>{this.state.nameformat}</div>    
                    </div>
                    <button className="btn btn-success" onClick={this.saveTenant}>保存</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"15px"}}>取消</button>
                    </form>
                   </div>
                  </div>
                  </div>
        )
    }
}

export default AddTenantComponent