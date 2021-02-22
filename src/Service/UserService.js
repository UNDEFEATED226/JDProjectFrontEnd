import axios from 'axios'

class UserService{
    
    findAllUser(){
        return axios.get("/user/findalluser");
    }

    findAllUserPaginated(p){
        return axios.get("/user/findalluserpaginated?pageNo="+p);
    }

    count(){
        return axios.get("/user/count");
    }

    page(){
        return axios.get("/user/page");
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

    deleteUser(id){
        return axios.get("/user/deleteuser?id="+id);
    }
}

export default new UserService()