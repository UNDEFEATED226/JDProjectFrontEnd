import axios from 'axios'

class ResourceService{

    findAllResource(){
        return axios.get("/resource/findallresource");
    }

    count(){
        return axios.get("/resource/count");
    }

    page(){
        return axios.get("/resource/page");
    }

    resourceMenu(resourcetypeid){
        return axios.get("/resource/resourcemenu?resourcetypeid="+resourcetypeid);
    }

    findById(id){
        return axios.get("/resource/findbyid?id="+id);
    }

    addResource(resource){
        return axios.post("/resource/addresource",resource);
    }

    deleteResource(id){
        return axios.get("/resource/deleteresource?id="+id);
    }

    editResource(id,resource){
        return axios.post("/resource/editresource/"+id,resource);
    }
}

export default new ResourceService()