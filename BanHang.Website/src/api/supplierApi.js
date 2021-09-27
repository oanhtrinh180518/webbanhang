import axiosClient from "./axiosClient"

const supplierApi={
    getAllSupplier:()=>{
        return axiosClient.get(`${process.env.REACT_APP_API_URL}/supplier/getall`)
    }
};
export default supplierApi;