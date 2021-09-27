import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createPicture,
  getAllProduct,
  getAllProductAdmin,
} from "../../app/productSlice";
import ProSearchAd from "../../components/shared/card/ProductCard/ProSearchAd";
import AddToProductModal from "../../components/shared/Modal/AddToProductModal";
import CustomPagination from "../../components/shared/pagination/CustomPagination";
import Table from "react-bootstrap/Table";
import ProductItem from "../../components/shared/card/ProductCard/ProductItem";
//start
import { FcDown, FcUp } from "react-icons/fc";
//end
function ProductsManage(props) {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState({});
  const [valuesFilter, setValuesFilter] = useState({});
  const pageSize = 10;
  const products = useSelector((state) => state.product.productResult2);
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [reload, setReload] = useState(0);
  //start
  const icon = { color: "#fff", size: "20px" };
  const [productList, setProductList] = useState([]);
  const [sortby, setSortby] = useState({});
  useEffect(() => {
    const onLoad = async (valuesFilter, sortby) => {
      await onLoadData(valuesFilter, sortby);
    };
    onLoad(valuesFilter, sortby);
    // eslint-disable-next-line
  }, [pageIndex, valuesFilter, reload, sortby]);

  const onLoadData = async (valuesFilter, sortby) => {
    const actionProduct = await dispatch(
      getAllProductAdmin({
        ...valuesFilter,
        ...sortby,
        PageIndex: pageIndex,
        PageSize: pageSize,
      })
    );
    const apiProduct = await unwrapResult(actionProduct);
    setPagination(apiProduct.result);
  };
  console.log(productList);

  return (
    <div className="admin__products">
      <div className="admin__products-header d-flex justify-content-between">
        <h3 className={"m-b-20 font-weight-bold"}>Products management</h3>
        <AddToProductModal reload={(reloadIndex) => setReload(reloadIndex)} />
      </div>

      <div className="admin__product-search">
        <ProSearchAd
          setValuesFilter={(valuesFilter) => setValuesFilter(valuesFilter)}
          setPageIndex={(pageIndex) => setPageIndex(pageIndex)}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center m-3">
        {pageIndex * pageSize > pagination.totalRecords ? (
          <h6>
            Showing {pageSize * (pageIndex - 1) + 1}-{pagination.totalRecords}{" "}
            of {pagination.totalRecords} results
          </h6>
        ) : (
          <h6>
            Showing {pageSize * (pageIndex - 1) + 1}-{pageSize * pageIndex} of{" "}
            {pagination.totalRecords} results
          </h6>
        )}
        <CustomPagination
          pagination={pagination}
          page={pageIndex}
          setPage={(page) => setPageIndex(page)}
        />
      </div>
      <div className="admin__product-table">
        {/* {products && products} */}
        <Table bordered hover>
          <thead>
            <tr className="list-cart">
              <th className="col-1 text-center  align-middle">STT</th>
              <th className="col-2 text-center align-middle ">
                Product Name
                <FcUp {...icon} onClick={() => setSortby({ SortBy: 1 })} />
                <FcDown {...icon} onClick={() => setSortby({ SortBy: 2 })} />
              </th>
              <th className="col-2 text-center  align-middle">Category Name</th>
              <th className="col-1 text-center align-middle">Supplier Name</th>
              <th className="col-2 text-center align-middle">
                Unitil Price
                <FcUp {...icon} onClick={() => setSortby({ SortBy: 3 })} />
                <FcDown {...icon} onClick={() => setSortby({ SortBy: 4 })} />
              </th>
              <th className="col-1 text-center align-middle">
                Available Quantity
                <FcUp {...icon} onClick={() => setSortby({ SortBy: 5 })} />
                <FcDown {...icon} onClick={() => setSortby({ SortBy: 6 })} />
              </th>
              <th className="col-2 text-center align-middle">Create Date</th>
              <th className="col-2 text-center align-middle">Exp Date</th>
              <th className="col-1 text-center align-middle">Active</th>
              <th className="col-1 text-center align-middle">Update</th>
            </tr>
          </thead>
          <tbody>
            {/* start */}
            {products.map((product, index) => (
              // end
              <ProductItem
                key={index}
                product={product}
                index={index}
                pageIndex={pageIndex}
                pageSize={pageSize}
                reloadIndex={reload}
                reload={(reloadIndex) => setReload(reloadIndex)}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductsManage;
