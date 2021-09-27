import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiShoppingCart, FiMenu } from "react-icons/fi";
import { FaRegUser, FaTimes } from "react-icons/fa";
import Logo from "../../../assets/img/logo/oganuceic.png";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../app/userSlice";
import { getAllCartByUerId } from "../../../app/cartSlice";

function HeaderCenter({ setShow, isShow }) {
  const history = useHistory();
  const [cookies, setCookies, removeCookie] = useCookies();
  const { userInfo } = useSelector(userSelector);
  const carts = useSelector((state) => state.cart.cartResult);
  const reloadIndex = useSelector((state) => state.cart.reloadIndex);
  const [stickyClass, setStickyClass] = useState(
    "header__center sticky-header pt-3"
  );
  const [reloadData, setReloadData] = useState(reloadIndex && reloadIndex);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setStickyClass("header__center sticky-header pt-3 is-sticky");
      } else if (window.scrollY === 0) {
        setStickyClass("header__center sticky-header pt-3");
      }
    });
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllCartByUerId({ PageIndex: 1, PageSize: 9 }));
  }, [reloadData]);

  const logOut = () => {
    removeCookie("access_token");
    history.push("/");
  };
  return (
    <>
      <div className={stickyClass}>
        {/*<div className={"header__center sticky-header pt-3"}>*/}
        {/*{console.log(window.pageYOffset)}*/}
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              {/* logo */}
              <div className="header__logo">
                <Link to="/Home" className="header__logo-link img-responsive">
                  <img
                    src={Logo}
                    alt=""
                    className="header__logo-img img-fluid"
                  />
                </Link>
              </div>
              {/* End logo */}
              {/* Start Header Menu */}
              <div className="header-menu">
                <nav>
                  <ul className="header__nav">
                    {/* Single nav link */}
                    <li className="header__nav-item pos-relative">
                      <Link to="/Home" className="header__nav-link">
                        Home
                      </Link>
                    </li>
                    <li className="header__nav-item pos-relative">
                      <Link to="/Product" className="header__nav-link">
                        Products
                      </Link>
                    </li>
                    <li className="header__nav-item pos-relative">
                      <Link to="/AboutUs" className="header__nav-link">
                        About Us
                      </Link>
                    </li>
                    <li className="header__nav-item pos-relative">
                      <Link to="/ContactUs" className="header__nav-link">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* AddCart box */}
              {cookies["access_token"] ? (
                <ul className="header__user-action-icon d-flex position-relative">
                  <li>
                    <div className="header__username">
                      <Link to="/UserProfile">
                        <FaRegUser />
                      </Link>
                      <p>{userInfo && userInfo.userName}</p>
                    </div>

                    <div className={"profile__dropdown position-absolute"}>
                      <ul className={"profile__dropdown-menu"}>
                        <li className={"profile__dropdown-item"}>
                          <Link to={"/userProfile"}>Profile</Link>
                        </li>
                        {/*<li className={"profile__dropdown-item"}>*/}
                        {/*  <Link to={"/Cart"}>View Order</Link>*/}
                        {/*</li>*/}
                        <li className={"profile__dropdown-item"}>
                          <Link
                            className={"btn--logout"}
                            to={""}
                            onClick={logOut}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <Link to="/Cart">
                      <FiShoppingCart />
                      <span className="item-count pos-absolute">
                        {carts && carts.length}
                      </span>
                    </Link>
                  </li>
                  {/*<div className="cart__dropdown-menu">*/}
                  {/*  <div className="cart__dropdown-products">*/}
                  {/*    <div className="cart__product-details">*/}

                  {/*    </div>*/}
                  {/*    <figure className="cart__product-img"></figure>*/}
                  {/*    <FaTimes/>*/}
                  {/*  </div>*/}
                  {/*  <div className="cart__dropdown-total"></div>*/}
                  {/*  <div className="cart__dropdown-action"></div>*/}
                  {/*</div>*/}
                  <button
                    className="item-hamburger-btn"
                    onClick={() => setShow(!isShow)}
                  >
                    <FiMenu />
                  </button>
                </ul>
              ) : (
                <div className={"header__action--nonLogin"}>
                  <Link to={"/login"}>Login</Link>
                  <Link to={"/register"}>Register</Link>
                  <button
                    className="item-hamburger-btn"
                    onClick={() => setShow(!isShow)}
                  >
                    <FiMenu />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderCenter;
