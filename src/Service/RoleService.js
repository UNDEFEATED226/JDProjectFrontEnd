import axios from 'axios'

class RoleService{
    
    findAllRole(){
        return axios.get("/role/findallrole");
    }
}

export default new RoleService()