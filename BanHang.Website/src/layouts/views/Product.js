import { React, useEffect, useState } from "react";
import ProductSideBar from "../../components/product/product-left/ProductSideBar";

import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, searchProduct } from "../../app/productSlice";
import ProductRate from "../../components/product/product-left/ProductRate";
import CustomPagination from "../../components/shared/pagination/CustomPagination";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
import ProList from "../../components/product/ProList";

export default function Product() {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState({});
  const [valuesFilter, setValuesFilter] = useState({});
  const [valueSearch, setValuesSearch] = useState({});
  const [valueSort, setValueSort] = useState({});
  const pageSize = 8;
  const products = useSelector((state) => state.product.productResult);
  const location = useLocation();
  const filter = location.state?.search ? location.state?.search : null;
  const change = location.state?.change ? location.state?.change : null;

  const filter2 = location.state?.search2 ? location.state?.search2 : null;

  const SortBy = [
    "Relevance",
    "Name, A to Z",
    "Name, Z to A",
    "Price, low to high",
    "Price, high to low",
  ];

  useEffect(() => {
    if (filter) {
      setValuesSearch({ Search: filter });
    }
  }, [filter, change]);

  useEffect(() => {
    filter2 && setValuesSearch({ Search: filter2 });
  }, [filter2]);

  useEffect(() => {
    const onLoad = async (valuesFilter, valueSearch, valueSort) => {
      await onLoadData(valuesFilter, valueSearch, valueSort);
    };
    onLoad(valuesFilter, valueSearch, valueSort);
  }, [pageIndex, valuesFilter, valueSearch, valueSort]);

  const onLoadData = async (valuesFilter, valueSearch, valueSort) => {
    const actionProduct = await dispatch(
      getAllProduct({
        ...valuesFilter,
        ...valueSearch,
        ...valueSort,
        PageIndex: pageIndex,
        PageSize: pageSize,
      })
    );
    const apiProduct = await unwrapResult(actionProduct);
    setPagination(apiProduct.result);
  };

  const onChangeSortby = (e) => {
    setValueSort({ SortBy: parseInt(e.target.value) });
    setPageIndex(1);
  };

  return (
    <div className="pro pro-container ">
      <div className="pro-left">
        <div className="pro-left-sidebar">
          <ProductSideBar
            setValuesFilter={(valuesFilter) => setValuesFilter(valuesFilter)}
            setPageIndex={(pageIndex) => setPageIndex(pageIndex)}
            setValuesSearch={() => setValuesSearch({})}
          />
        </div>
        <div className="pro-left-rate">
          <ProductRate />
        </div>
      </div>
      <div className="pro-right">
        <div className="pro-right-up">
          <div className="sortby">
            <h6>Sort by:</h6>
            <select
              name="sortby"
              id="sortby"
              onChange={(e) => onChangeSortby(e)}
            >
              {SortBy.map((item, index) => (
                <option className="sortby--item" value={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <h6>
            Showing {pageSize * (pageIndex - 1) + 1} -{" "}
            {pageIndex * pageSize > pagination.totalRecords
              ? pagination.totalRecords
              : pageSize * pageIndex}{" "}
            of {pagination.totalRecords} results
          </h6>
        </div>
        <div className="pro-right-list">
          <ProList products={products} />
        </div>
        <div className="pro-right-pagination">
          <CustomPagination
            pagination={pagination}
            page={pageIndex}
            setPage={(page) => setPageIndex(page)}
          />
        </div>
      </div>
      {/* 
      </div>
      <div className="product__side-bar--mobile">
        <ProductSideBar
          setValuesFilter={(valuesFilter) => setValuesFilter(valuesFilter)}
        />
      </div> 
      */}
    </div>
  );
}
