import axios from 'axios'

class RoleService{
    
    findAllRole(){
        return axios.get("/role/findallrole");
    }

    roleMenu(roletype){
        return axios.get("/role/rolemenu?roletype="+roletype);
    }

    findById(id){
        return axios.get("/role/findbyid?id="+id);
    }

    addRole(role){
        return axios.post("/role/addrole",role);
    }  

    editRole(id,role){
        return axios.post("/role/editrole/"+id,role);
    }

    deleteRole(id){
        return axios.get("/role/deleterole?id="+id);
    }
}

export default new RoleService()