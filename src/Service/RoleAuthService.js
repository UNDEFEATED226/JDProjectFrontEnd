import axios from 'axios'

class RoleAuthService{

    findAllRoleAuth(){
        return axios.get("/roleauth/findallroleauth");
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