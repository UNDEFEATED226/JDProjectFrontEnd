import axios from 'axios'

class RoleAuthService{

    findAllRoleAuth(){
        return axios.get("/roleauth/findallroleauth");
    }

    findAllRoleAuthPaginated(p){
        return axios.get("/roleauth/findallroleauthpaginated?pageNo="+p);
    }

    findByRoleid(roleid){
        return axios.get("/roleauth/findbyroleid?roleid="+roleid);
    }

    count(){
        return axios.get("/roleauth/count");
    }

    page(){
        return axios.get("/roleauth/page");
    }
    
    findById(id){
        return axios.get("/roleauth/findbyid?id="+id);
    }

    addRoleAuth(roleauth){
        return axios.post("/roleauth/addroleauth",roleauth);
    }

    deleteRoleAuth(id){
        return axios.get("/roleauth/deleteroleauth?id="+id);
    }

    editRoleAuth(id,roleauth){
        return axios.post("/roleauth/editroleauth/"+id,roleauth);
    }
}

export default new RoleAuthService()