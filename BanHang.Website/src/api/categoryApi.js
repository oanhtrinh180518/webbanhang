import axiosClient from "./axiosClient";


const categoryApi = {
    getAll:() =>{
        return axiosClient.get(`${process.env.REACT_APP_API_URL}/category/getall`)
    }
};

export default categoryApi