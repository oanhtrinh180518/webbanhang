import { unwrapResult } from "@reduxjs/toolkit";
import { ErrorMessage, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCategory } from "../../../../app/categorySlice";
import { getAllSupplier } from "../../../../app/supplierSlice";
import { createProduct } from "../../../../app/productSlice";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
// start
import toast, { Toaster } from "react-hot-toast";
// end

const ProductAddCard = (props) => {
  const [categorys, setCategorys] = useState([]);
  const categorySelect = [];
  categorys.map((item, index) =>
    categorySelect.push({ value: item, label: item.name })
  );

  const [suppliers, setSupplier] = useState([]);
  const supplierSelect = [];
  suppliers.map((item, index) =>
    supplierSelect.push({ value: item, label: item.name })
  );

  //Status required field
  const [isProduct, setProduct] = useState(false);

  const dispatch = useDispatch();
  useEffect(async () => {
    const actionCategory = await dispatch(getAllCategory());
    const itemCategory = await unwrapResult(actionCategory).result;
    setCategorys(itemCategory);

    const acctionSupplier = await dispatch(getAllSupplier());
    const itemSupplier = await unwrapResult(acctionSupplier).result;
    setSupplier(itemSupplier);
  }, []);

  //field image
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [isload, setIsload] = useState(false);
  const onCancel = () => {
    setIsload(false);
    formik.setFieldValue("image", "");
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        // this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
      setFile(event.target.files[0]);
    }
    formik.setFieldValue("image", event.target.files[0]);
    setIsload(true);
  };

  //field date
  const today = new Date();
  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  const date =
    today.getDate() < 10 ? `0${today.getDate()}` : today.getDate() + 1;

  const time = `${today.getFullYear()}-${month}-${date}`;
  // const expdate=`${today.getFullYear()}-${month}-${date}`;
  // console.log(today.addDays(3));

  const validationSchema = yup.object().shape({
    nameProduct: yup.string().required("Required field"),
    supplier: yup.object().required("Required field"),
    category: yup.object().required("Required field"),
    unitPrice: yup.number().required("Required field"),
    availableQuantity: yup.number().required("Required field"),
    weight: yup.number().required("Required field"),
  });
  const formik = useFormik({
    initialValues: {
      nameProduct: "",
      supplier: "",
      category: "",
      description: "null",
      unitPrice: 10000,
      availableQuantity: 20,
      weight: 1,
      image: null,
      createdate: time,
      // start
      expdate: time,
      // end
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      // console.log("abc", values.image.name);
      //start
      if (values.image == null) {
        console.log("thieu img");
        toast.error("Bạn chưa thêm ảnh!");
      } else {
        await dispatch(
          createProduct({
            CategoryId: parseInt(values.category.value.id),
            SupplierId: parseInt(values.supplier.value.id),
            Name: values.nameProduct,
            Description: values.description,
            UnitPrice: values.unitPrice,
            AvailableQuantity: values.availableQuantity,
            Weight: values.weight,
            ImagesProduct: values.image,
            CreateDate: values.createdate,
            ExpDate: values.expdate,
          })
        );
        props.handleClose();
        props.reload(Math.floor(Math.random() * 100));
      }
      //end
    },
  });
  return (
    <div className="product-add-to-card">
      {/* start */}
      <Toaster style={{ "z-index": "10000" }} />
      {/* end */}
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex">
          <div className=" col-4  ">
            <div className="__img border ">
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
                    className="img-icon "
                    onClick={() => onCancel()}
                  />
                </>
              )}
            </div>
            <input
              type="file"
              id="image"
              name="image"
              className="d-none"
              accept="image/*"
              hideThumbnailContent={false}
              onChange={(e) => onImageChange(e)}
            />
          </div>
          <div className="col-8 pr-0">
            <div className="__name  flex-column col">
              <h6 htmlFor="nameProduct">Name Product</h6>
              <input
                id="nameProduct"
                name="nameProduct"
                className="border w-100 p-2 rounded"
                placeholder="Enter name product"
                onChange={formik.handleChange}
                {...formik.getFieldProps("nameProduct")}
              />
              <p style={{ color: "red" }} className="m-0" name="nameProduct">
                {formik.errors.nameProduct}
              </p>
            </div>
            <div className="d-flex mt-3">
              <div className="__supplier col">
                <h6 htmlFor="supplier">Supplier</h6>
                <Select
                  id="supplier"
                  name="supplier"
                  defaultValue=""
                  onChange={(supplierOption) =>
                    formik.setFieldValue("supplier", supplierOption)
                  }
                  isClearable={true}
                  options={supplierSelect}
                />
                {formik.errors.supplier && (
                  // formik. touched.supplier &&
                  <p className="m-0" style={{ color: "red" }}>
                    {formik.errors.supplier}
                  </p>
                )}
              </div>

              <div className="__category   col">
                <h6 htmlFor="category">Category</h6>

                <Select
                  id="category"
                  name="category"
                  onChange={(categoryOption) =>
                    formik.setFieldValue("category", categoryOption)
                  }
                  isClearable={true}
                  options={categorySelect}
                />
                <p className="m-0" style={{ color: "red" }}>
                  {" "}
                  {formik.errors.category}
                </p>
              </div>
            </div>
            <div className="d-flex mt-3">
              <div className="__unitPrice  col">
                <h6 htmlFor="unitPrice">Unitprice</h6>
                <input
                  type="number"
                  min="0"
                  className="border w-100 p-2 rounded"
                  name="unitPrice"
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("unitPrice")}
                />
                {formik.errors.unitPrice && formik.touched.unitPrice && (
                  <p className="m-0" style={{ color: "red" }}>
                    {formik.errors.unitPrice}
                  </p>
                )}
              </div>
              <div className="__available-quantity  col ">
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
              <div className="__weight col ">
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
            <h6 htmlFor="nameProduct">Create Date</h6>
            <input
              type="date"
              id="createdate"
              name="createdate"
              className="border w-100 p-2 rounded"
              defaultValue={time}
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
              defaultValue={time}
              className="border w-100 p-2 rounded"
              // defaultValue={time}
              // placeholder="Enter name product"
              onChange={formik.handleChange}
              {...formik.getFieldProps("expdate")}
            />
          </div>
        </div>
        <div className="__description col mt-3">
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

        <div className="__btn-submit col d-flex justify-content-end mb-4 mt-3">
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

export default ProductAddCard;
