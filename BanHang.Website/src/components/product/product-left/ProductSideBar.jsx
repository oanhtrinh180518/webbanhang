import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSupplier } from "../../../app/supplierSlice";
import { getAllProduct, getWeight } from "../../../app/productSlice";
import { useFormik } from "formik";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import Select from "react-select";

const ProductSideBar = ({ setValuesFilter, setPageIndex, setValuesSearch }) => {
  const [categorys, setCategorys] = useState([]);
  const categorysResult = useSelector((state) => state.category.categoryResult);
  const categorySelect = [];
  categorys.map((item, index) =>
    categorySelect.push({ value: item, label: item.name })
  );
  // const weights = [
  //   { value: 1, label: 1 },
  //   { value: 2, label: 2 },
  //   { value: 3, label: 3 },
  // ];

  const [suppliers, setSupplier] = useState([]);
  const supplierSelect = [];
  suppliers.map((item, index) =>
    supplierSelect.push({ value: item, label: item.name })
  );

  const [weights, setWeights] = useState([]);
  const weightSelect = [];
  weights &&
    weights.map((item) =>
      weightSelect.push({ value: item.weight, label: item.weight })
    );

  const dispatch = useDispatch();
  useEffect(() => {
    const onLoad = async () => {
      const acctionSupplier = await dispatch(getAllSupplier());
      const itemSupplier = await unwrapResult(acctionSupplier).result;
      setSupplier(itemSupplier);

      const actionWeight = await dispatch(getWeight());
      const itemWeight = await unwrapResult(actionWeight);
      setWeights(itemWeight.result);
    };
    onLoad();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const onLoad = async () => {
      dispatch(getAllProduct());

      setCategorys(categorysResult);
    };
    onLoad();
    // eslint-disable-next-line
  }, [categorysResult]);

  const formik = useFormik({
    initialValues: {
      category: null,
      weight: null,
      supplier: null,
      pricefrom: null,
      priceto: null,
    },
    onSubmit: async (values) => {
      const value = {
        PriceFrom: values.pricefrom === 0 ? null : values.pricefrom,
        PriceTo: values.priceto === 0 ? null : values.priceto,
        SupplierName: values.supplier ? values.supplier.label : null,
        CategoryName: values.category ? values.category.label : null,
        Weight: values.weight ? parseInt(values.weight.label) : null,
      };
      setValuesFilter(value);
      setPageIndex(1);
      setValuesSearch();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="__category">
          <h6 htmlFor="category" className=" font-weight-bold  text-uppercase">
            CATEGORY
          </h6>
          <Select
            id="category"
            name="category"
            className=" pb-3  "
            onChange={(categoryOption) =>
              formik.setFieldValue("category", categoryOption)
            }
            isClearable={true}
            options={categorySelect}
          />
        </div>

        <div className="__weight">
          <h6 htmlFor="weight" className=" font-weight-bold  text-uppercase">
            WEIGHT
          </h6>
          <Select
            id="weight"
            name="weight"
            className="pb-3"
            onChange={
              (weightOption) => formik.setFieldValue("weight", weightOption)
              // console.log("weightOption",weightOption)
            }
            isClearable={true}
            options={weightSelect}
          />
        </div>
        <div className="__supplier">
          <h6 htmlFor="supplier" className="font-weight-bold text-uppercase">
            Supplier
          </h6>
          <Select
            id="supplier"
            name="supplier"
            className="pb-3"
            onChange={(supplierOption) =>
              formik.setFieldValue("supplier", supplierOption)
            }
            isClearable={true}
            options={supplierSelect}
          />
        </div>
        <div className="__price">
          <h6 htmlFor="price" className="font-weight-bold text-uppercase">
            Price
          </h6>
          <input
            type="number"
            className="input__price-from form-control mb-2"
            placeholder="Price from: "
            id="price-from"
            name="pricefrom"
            onChange={formik.handleChange}
            {...formik.getFieldProps("pricefrom")}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price to: "
            id="price-to"
            name="priceto"
            {...formik.getFieldProps("priceto")}
          />
        </div>
        <div className="__btn-submit d-flex justify-content-center">
          <button
            type="submit"
            onClick={() => formik.handleSubmit()}
            className="product__send-button btn btn-success"
          >
            Áp dụng
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductSideBar;
