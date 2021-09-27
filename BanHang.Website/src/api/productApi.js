import axiosClient from "./axiosClient";
import axiosFormClient from "./axiosFormClient";

//cal api
const productApi = {
  getAllProduct: (
    PageIndex,
    PageSize,
    PriceFrom,
    PriceTo,
    SupplierName,
    CategoryName,
    Weight,
    IsRate,
    Search,
    SortBy
  ) => {
    const data = JSON.stringify({
      PageIndex,
      PageSize,
      PriceFrom,
      PriceTo,
      SupplierName,
      CategoryName,
      Weight,
      IsRate,
      Search,
      SortBy,
    });

    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/product/search`,
      data
    );
  },

  getAllProductRate: (PageIndex, PageSize, IsRate) => {
    const data = JSON.stringify({
      PageIndex: PageIndex,
      PageSize: PageSize,
      IsRate,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/product/search`,
      data
    );
  },

  getProductById: (productId) => {
    return axiosClient.get(
      `${process.env.REACT_APP_API_URL}/product/getbyProductId/${productId}`
    );
  },

  createProduct: (
    CategoryId,
    Name,
    Description,
    UnitPrice,
    AvailableQuantity,
    Weight,
    ImagesProduct,
    SupplierId,
    CreateDate,
    ExpDate
  ) => {
    const dataFormBody = new FormData();
    dataFormBody.append("CategoryId", CategoryId);
    dataFormBody.append("Name", Name);
    dataFormBody.append("Description", Description);
    dataFormBody.append("UnitPrice", UnitPrice);
    dataFormBody.append("AvailableQuantity", AvailableQuantity);
    dataFormBody.append("Weight", Weight);
    dataFormBody.append("ImagesProduct", ImagesProduct);
    dataFormBody.append("Image", ImagesProduct);
    dataFormBody.append("SupplierId", SupplierId);
    dataFormBody.append("CreateDate", CreateDate);
    dataFormBody.append("ExpDate", ExpDate);

    return axiosFormClient.post(
      `${process.env.REACT_APP_API_URL}/product/create`,
      dataFormBody
    );
  },
  updateStatusProduct: (id, status) => {
    const data = JSON.stringify({
      id,
      status,
    });
    return axiosClient.put(
      `${process.env.REACT_APP_API_URL}/product/updatestatus`,
      data
    );
  },

  getBestSellingProduct: (PageIndex, PageSize) => {
    const data = JSON.stringify({
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/product/getbestsellingorder`,
      data
    );
  },
  updateProduct: (
    Id,
    Name,
    CategoryId,
    SupplierId,
    Description,
    UnitPrice,
    AvailableQuantity,
    Weight,
    ImagesProduct,
    CreateDate,
    ExpDate
  ) => {
    const dataFormBody = new FormData();
    dataFormBody.append("Id", Id);
    dataFormBody.append("Name", Name);
    dataFormBody.append("CategoryId", CategoryId);
    dataFormBody.append("SupplierId", SupplierId);
    dataFormBody.append("Description", Description);
    dataFormBody.append("UnitPrice", UnitPrice);
    dataFormBody.append("AvailableQuantity", AvailableQuantity);
    dataFormBody.append("Weight", Weight);
    dataFormBody.append("ImagesProduct", ImagesProduct);
    dataFormBody.append("CreateDate", CreateDate);
    dataFormBody.append("ExpDate", ExpDate);

    return axiosFormClient.put(
      `${process.env.REACT_APP_API_URL}/product/update`,
      dataFormBody
    );
  },
  searchProduct: (Search) => {
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/product/search2`,
      JSON.stringify({ Search })
    );
  },
  getAllProductAdmin: (
    PageIndex,
    PageSize,
    PriceFrom,
    PriceTo,
    SupplierName,
    CategoryName,
    Weight,
    IsRate,
    ProductName,
    //start
    SortBy
    //end
  ) => {
    const data = JSON.stringify({
      PageIndex,
      PageSize,
      PriceFrom,
      PriceTo,
      SupplierName,
      CategoryName,
      Weight,
      IsRate,
      ProductName,
      //start
      SortBy,
      //end
    });
    // return axiosClient.post("http://10.10.10.59:1999/product/search",data)
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/product/search-admin`,
      data
    );
  },
  getWeight: () => {
    return axiosClient.get(
      `${process.env.REACT_APP_API_URL}/product/getweight`
    );
  },
};
export default productApi;
