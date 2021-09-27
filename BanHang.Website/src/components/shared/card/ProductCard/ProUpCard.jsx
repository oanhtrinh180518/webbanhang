import { unwrapResult } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCategory } from "../../../../app/categorySlice";
import { getAllSupplier } from "../../../../app/supplierSlice";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  updateStatusProduct,
} from "../../../../app/productSlice";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import { AiOutlineClose } from "react-icons/ai";

const ProductUpdateCard = (props) => {
  const [categorys, setCategorys] = useState([]);
  const categorySelect = [];
  categorys.map((item, index) =>
    categorySelect.push({ value: item, label: item.name })
  );
  const defaultCategory = {
    label: props.product.categoryName,
    value: { id: props.product.categoryId },
  };

  const [suppliers, setSupplier] = useState([]);
  const supplierSelect = [];
  suppliers.map((item, index) =>
    supplierSelect.push({ value: item, label: item.name })
  );
  const defaultSupplier = {
    label: props.product.supplierName,
    value: { id: props.product.supplierId },
  };

  const createDate = props.product.createDate.substring(
    0,
    props.product.createDate.indexOf("T")
  );
  const expDate = props.product.expDate.substring(
    0,
    props.product.expDate.indexOf("T")
  );
  //console.log(expDate);

  const dispatch = useDispatch();
  useEffect(async () => {
    const actionCategory = await dispatch(getAllCategory());
    const itemCategory = await unwrapResult(actionCategory).result;
    setCategorys(itemCategory);

    const acctionSupplier = await dispatch(getAllSupplier());
    const itemSupplier = await unwrapResult(acctionSupplier).result;
    setSupplier(itemSupplier);
  }, []);

  const formik = useFormik({
    initialValues: {
      nameProduct: props.product.name,
      supplier: defaultSupplier,
      category: defaultCategory,
      description: props.product.description,
      unitPrice: props.product.unitPrice,
      availableQuantity: props.product.availableQuantity,
      weight: props.product.weight,
      createdate: createDate,
      expdate: expDate,
      // updatedate: props.product.updatedate,
      // status:props.product.status
      //   image: null,
    },

    onSubmit: async (values) => {
      await dispatch(
        updateProduct({
          Id: props.product.id,
          Name: values.nameProduct,
          CategoryId: parseInt(values.category.value.id),
          SupplierId: parseInt(values.supplier.value.id),
          Description: values.description,
          UnitPrice: values.unitPrice,
          AvailableQuantity: values.availableQuantity,
          Weight: values.weight,
          // Status: 0,
          ImagesProduct: values.image,
          CreateDate: values.createdate,
          ExpDate: values.expdate,
        })
      );
      props.reload(Math.floor(Math.random() * 100));
      props.handleClose();
    },
  });

  //img
  const [image, setImage] = useState(props.product.pictures[0].filePath);
  const [file, setFile] = useState();
  const [isload, setIsload] = useState(true);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setFile(event.target.files[0]);
    }
    formik.setFieldValue("image", event.target.files[0]);
    setIsload(true);
  };
  const onCancel = () => {
    setIsload(false);
    formik.setFieldValue("image", "");
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex">
          <div className="col-4">
            <div className="__img boder">
              {!isload && (
                <label for="image">
                  <p className="__img-p text-center font-italic">
                    <b>Drag image to upload </b>
                    <br />
                    or <b>Choose image</b>
                  </p>
                </label>
              )}
              {isload && (
                <>
                  <img id="target" src={image} width="250px" height="250px" />
                  <AiOutlineClose
                    className="img-icon"
                    onClick={() => onCancel()}
                  />
                </>
              )}
              {/* <img id="target" src={props.product.pictures[0].filePath} width="200px" height="auto" /> */}
            </div>
            <input
              type="file"
              id="image"
              name="image"
              className="d-none"
              accept="image/*"
              // hideThumbnailContent={false}
              onChange={(e) => onImageChange(e)}
            />
          </div>
          <div className="col-8 pr-0">
            <div className="__name  flex-column col">
              <h6 htmlFor="nameProduct">Name Product</h6>
              <input
                name="nameProduct"
                className="border w-100 p-2 rounded"
                placeholder="Enter name product"
                onChange={formik.handleChange}
                {...formik.getFieldProps("nameProduct")}
              />
            </div>
            <div className="d-flex mt-3">
              <div className="__supplier  col">
                <h6 htmlFor="supplier">Supplier</h6>
                <Select
                  id="supplier"
                  name="supplier"
                  className="pb-3"
                  defaultValue={defaultSupplier}
                  onChange={(supplierOption) =>
                    formik.setFieldValue("supplier", supplierOption)
                  }
                  isClearable={true}
                  options={supplierSelect}
                />
              </div>
              <div className="__category  col">
                <h6 htmlFor="category">Category</h6>
                <Select
                  id="category"
                  name="category"
                  className=" pb-3"
                  defaultValue={defaultCategory}
                  onChange={(categoryOption) =>
                    formik.setFieldValue("category", categoryOption)
                  }
                  isClearable={true}
                  options={categorySelect}
                />
              </div>
            </div>
            <div className="d-flex mt-3">
              <div className="__unitPrice col">
                <h6 htmlFor="unitPrice">Unitprice</h6>
                <input
                  type="number"
                  min="0"
                  className="border w-100 p-2 rounded"
                  name="unitPrice"
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("unitPrice")}
                />
              </div>
              <div className="__available-quantity col">
                <h6 htmlFor="availableQuantity"> Quantity</h6>
                <input
                  type="number"
                  min="0"
                  className="border w-100 p-2 rounded"
                  name="availableQuantity"
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("availableQuantity")}
                />
              </div>
              <div className="__weight col">
                <h6 htmlFor="weight">Weight</h6>
                <input
                  type="number"
                  min="0"
                  className="border w-100 p-2 rounded"
                  name="weight"
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("weight")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="__createproduct col">
            <h6 htmlFor="createdate">Create Date</h6>
            <input
              type="date"
              id="createdate"
              name="createdate"
              className="border w-100 p-2 rounded"
              defaultValue={createDate}
              // placeholder="Enter name product"
              onChange={formik.handleChange}
              {...formik.getFieldProps("createdate")}
            />
            {/* <input type="date" id="create" name="create" value={time}/> */}
          </div>
          <div className="__expdate col">
            <h6 htmlFor="expdate">Exp Date</h6>
            <input
              type="date"
              id="expdate"
              name="expdate"
              defaultValue={expDate}
              className="border w-100 p-2 rounded"
              // defaultValue={time}
              // placeholder="Enter name product"
              onChange={formik.handleChange}
              {...formik.getFieldProps("expdate")}
            />
          </div>
        </div>
        <div className="__description  col mt-3">
          <h6 htmlFor="description">Description</h6>
          <textarea
            placeholder="Enter description"
            className="border w-100 p-2 rounded"
            name="description"
            rows={2}
            cols={100}
            onChange={formik.handleChange}
            {...formik.getFieldProps("description")}
          />
        </div>

        <div className="__btn-submit d-flex justify-content-end mb-4 mt-4 col">
          <button
            type="submit"
            // onClick={() => formik.handleSubmit()}
            className="product__send-button btn btn-info mr-2"
          >
            Save Changes
          </button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdateCard;
