import axios from 'axios'

class UserService{
    
    findAllUser(){
        return axios.get("http://localhost:8080/user/findalluser");
    }

    findById(id){
        return axios.get("http://localhost:8080/user/findbyid?id="+id);
    }

    addUser(user){
        return axios.post("http://localhost:8080/user/adduser",user);
    }  
}

export default new UserService()