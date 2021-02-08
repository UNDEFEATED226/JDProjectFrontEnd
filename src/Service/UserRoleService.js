import axios from 'axios'

class UserRoleService{

    findAllUserRole(){
        return axios.get("/userrole/findalluserrole");
    }

    findById(id){
        return axios.get("/userrole/findbyid?id="+id);
    }

    deleteUserRole(id){
        return axios.get("/userrole/deleteuserrole?id="+id);
    }

    addUserRole(userrole){
        return axios.post("/userrole/adduserrole",userrole);
    }
}

export default new UserRoleService()