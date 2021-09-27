import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useEffect } from "react";
import { FiMenu, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllCategory } from "../../../app/categorySlice";
import { searchProduct } from "../../../app/productSlice";

function HeaderBottom(props) {
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  useEffect(async () => {
    const actionCategory = await dispatch(getAllCategory());
    const itemCategopy = await unwrapResult(actionCategory).result;
    setCategories(itemCategopy);
  }, []);

  //search
  const [search, setSearch] = useState();
  let history = useHistory();
  const onSearch = async (e) => {
    e.preventDefault();
    search &&
      history.push({
        pathname: "/product",
        state: {
          search: search,
        },
      });
  };

  //link Category
  // const [handleCategory,setHandleCategory]=useState();
  const handleCategory = (value) => {
    // console.log(value)
    value &&
      history.push({
        pathname: "/product",
        state: {
          search2: value,
        },
      });
  };
  return (
    <>
      <div className="header__bottom pt-3">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-3 col-lg-3">
              <div
                className="header-menu-vertical pos-relative"
                onClick={() => setShowCategories(!showCategories)}
              >
                <h4 className="menu-title link--icon-left">
                  <FiMenu
                    style={{ marginRight: "4px", paddingBottom: ".1rem" }}
                  />
                  CATEGORIES
                </h4>
                <ul
                  className={
                    showCategories
                      ? "menu-content pos-absolute"
                      : "menu-content pos-absolute d-none"
                  }
                >
                  {categories.map((item, index) => (
                    <li className="menu-item">
                      <p onClick={() => handleCategory(item.name)}>
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <form className="header-search" onSubmit={(e) => onSearch(e)}>
                <div className="header-search__content pos-relative">
                  <input
                    type="search"
                    name="header-search"
                    placeholder="Tìm kiếm"
                    defaultValue=""
                    required
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="pos-absolute icon-search"
                    // onClick={(e) => onSearch(e.target.value)}
                    type="submit"
                  >
                    <FiSearch />
                  </button>
                </div>
              </form>
            </div>
            <div className="col-xl-2 col-lg-3">
              <div className="header-phone text-right">
                <span>Call Us: 123 456 789</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HeaderBottom;
