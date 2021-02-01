import axios from 'axios'

class UserService{
    
    findAllUser(){
        return axios.get("/user/findalluser");
    }

    findById(id){
        return axios.get("/user/findbyid?id="+id);
    }

    addUser(user){
        return axios.post("/user/adduser/",user);
    }  

    editUser(id,user){
        return axios.post("/user/edituser/"+id,user);
    }
}

export default new UserService()