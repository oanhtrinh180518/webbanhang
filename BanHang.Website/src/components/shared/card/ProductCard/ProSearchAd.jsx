import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../../app/categorySlice";
import { getAllSupplier } from "../../../../app/supplierSlice";
import { getAllProduct, getWeight } from "../../../../app/productSlice";
import { useFormik } from "formik";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import Select from "react-select";
import { BsSearch } from "react-icons/bs";

const ProductSearchAdmin = ({ setValuesFilter, setPageIndex }) => {
  const [categorys, setCategorys] = useState([]);
  // const categorysResult = useSelector((state) => state.category.categoryResult);
  const categorySelect = [];
  categorys.map((item, index) =>
    categorySelect.push({ value: item, label: item.name })
  );

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
  useEffect(async () => {
    const onLoad = async () => {
      dispatch(getAllProduct());

      const acctionSupplier = await dispatch(getAllSupplier());
      const itemSupplier = await unwrapResult(acctionSupplier).result;
      setSupplier(itemSupplier);

      const actionCategory = await dispatch(getAllCategory());
      const itemCategory = await unwrapResult(actionCategory).result;
      setCategorys(itemCategory);

      const actionWeight = await dispatch(getWeight());
      const itemWeight = await unwrapResult(actionWeight);
      setWeights(itemWeight.result);
    };
    onLoad();
  }, []);

  const formik = useFormik({
    initialValues: {
      category: null,
      weight: null,
      supplier: null,
      pricefrom: null,
      priceto: null,
    },
    onSubmit: (values) => {
      const value = {
        ProductName: values.name === "" ? null : values.name,
        PriceFrom: values.pricefrom === "" ? null : values.pricefrom,
        PriceTo: values.priceto === "" ? null : values.priceto,
        SupplierName: values.supplier ? values.supplier.label : null,
        CategoryName: values.category ? values.category.label : null,
        Weight: values.weight ? parseInt(values.weight.label) : null,
      };
      console.log("value22", values);
      setValuesFilter(value);
      setPageIndex(1);
    },
  });

  return (
    <div className="product-side-bar">
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex ">
          <div className="__name  col">
            <h6 htmlFor="name" className="">
              Name product
            </h6>
            <input
              type="text"
              className="form-control mb-2 mr-4"
              placeholder="Name product: "
              id="name"
              name="name"
              onChange={formik.handleChange}
              {...formik.getFieldProps("name")}
            />
          </div>
          <div className="__category col">
            <h6 htmlFor="category" className=" ">
              Category
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
          <div className="__weight col">
            <h6 htmlFor="weight" className="">
              Weight
            </h6>
            <Select
              id="weight"
              name="weight"
              className="pb-3"
              onChange={(weightOption) =>
                formik.setFieldValue("weight", weightOption)
              }
              isClearable={true}
              options={weightSelect}
            />
          </div>
          <div className="__supplier col">
            <h6 htmlFor="supplier" className="">
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
          <div className="d-flex flex-column col">
            <h6 htmlFor="price" className="">
              Price from
            </h6>

            <input
              type="number"
              className="input__price-from form-control mb-2 mr-4"
              placeholder="Price from: "
              id="price-from"
              name="pricefrom"
              onChange={formik.handleChange}
              {...formik.getFieldProps("pricefrom")}
            />
          </div>
          <div className="col">
            <h6 htmlFor="price" className="">
              Price to
            </h6>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Price to: "
              id="price-to"
              name="priceto"
              {...formik.getFieldProps("priceto")}
            />
          </div>
          <div className="__btn-submit d-flex col">
            <div className="icon-search ">
              {/* start */}
              <div className="btn-search2">
                {/* end */}
                <button
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                  className="product__send-button btn btn-info "
                >
                  <BsSearch className="icon-search-2" />
                </button>
                {/* start */}
              </div>
              {/* end */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductSearchAdmin;
