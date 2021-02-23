import axios from 'axios'

class RoleService{
    
    findAllRole(){
        return axios.get("/role/findallrole");
    }

    findAllRolePaginated(p){
        return axios.get("/role/findallrolepaginated?pageNo="+p);
    }

    count(){
        return axios.get("/role/count");
    }

    countByRoletype(roletype){
        return axios.get("/role/countbyroletype?roletype="+roletype);
    }

    page(){
        return axios.get("/role/page");
    }

    pageByRoletype(roletype){
        return axios.get("/role/pagebyroletype?roletype="+roletype);
    }

    roleMenu(roletype){
        return axios.get("/role/rolemenu?roletype="+roletype);
    }

    roleMenuPaginated(roletype,pageNo){
        return axios.get("/role/rolemenupaginated?roletype="+roletype+"&pageNo="+pageNo);
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