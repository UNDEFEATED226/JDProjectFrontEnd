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
}

export default new UserService()