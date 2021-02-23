import axios from 'axios'

class ResourceService{

    findAllResource(){
        return axios.get("/resource/findallresource");
    }

    findAllResourcePaginated(p){
        return axios.get("/resource/findallresourcepaginated?pageNo="+p);
    }

    count(){
        return axios.get("/resource/count");
    }

    countByRestypeid(restypeid){
        return axios.get("/resource/countbyrestypeid?restypeid="+restypeid);
    }

    page(){
        return axios.get("/resource/page");
    }

    pageByRestypeid(restypeid){
        return axios.get("/resource/pagebyrestypeid?restypeid="+restypeid);
    }

    resourceMenu(restypeid){
        return axios.get("/resource/resourcemenu?restypeid="+restypeid);
    }

    resourceMenuPaginated(restypeid,p){
        return axios.get("/resource/resourcemenupaginated?restypeid="+restypeid+"&pageNo="+p);
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