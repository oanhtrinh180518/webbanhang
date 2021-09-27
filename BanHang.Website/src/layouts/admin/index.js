import React, { useEffect, useState } from "react";
import { Link, Switch } from "react-router-dom";
import { ContentRoute } from "../../route/ContentRoute";
import UsersManage from "../../layouts/admin/UsersManage";
import Order from "../../layouts/admin/Order";
import ProductsManage from "../../layouts/admin/ProductsManage";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { userSelector } from "../../app/userSlice";
import { SidebarData } from "./SidebarData";
import OrderManage from "./OrderManage";
import DashboardsItem from "./dashboard/DashboardItem";

function Admin() {
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookie] = useCookies();
  const classNames1 = {
    bodyClassName: "",
    headerClassName: "header",
    divNeed: "l-navbar",
    navNeed: "nav",
    iconNeed: "bx bx-menu",
    divContent: "admin__content",
  };
  const classNames2 = {
    bodyClassName: "body-pd",
    headerClassName: "header header-pd",
    divNeed: "l-navbar nav-show",
    navNeed: "nav nav-show",
    iconNeed: "bx bx-menu bx-x",
    divContent: "admin__content extend",
  };
  const [classNames, setClassNames] = useState(classNames1);
  const [extend, setExtend] = useState(true);

  // set admin name
  const { userInfo } = useSelector(userSelector);
  const [adminName, setAdminName] = useState("");
  const setName = () => {
    const adminName = userInfo.fullName;
    setAdminName(adminName);
  };
  useEffect(() => {
    userInfo && setName();
  }, [userInfo]);

  // show sidebar
  const showSidebar = () => {
    setExtend(!extend);
    if (extend === true) {
      setClassNames(classNames2);
    } else if (extend === false) {
      setClassNames(classNames1);
    }
  };

  // logout
  const logOut = () => {
    removeCookie("access_token");
    window.location.href = "/";
  };
  const products = useSelector((state) => state.product.productResult2);
  return (
    <>
      <div id="body-pd" className={classNames.bodyClassName}>
        <header className={classNames.headerClassName} id="header">
          <div className="header__toggle" onClick={() => showSidebar()}>
            <i className={classNames.iconNeed} id="header-toggle"></i>
          </div>

          <div className="header__hello">
            <span>{`Hello, ${adminName}`}</span>
          </div>
        </header>

        <div className={classNames.divNeed} id="nav-bar">
          <nav className={classNames.navNeed}>
            <div>
              <Link to={"/admin"} className="nav__logo">
                <i className="bx bxs-store nav__logo-icon"></i>
                <span className="nav__logo-name">Oganuceic</span>
              </Link>
              <div className="nav__list">
                {SidebarData.map((item) => {
                  return (
                    <Link to={item.path} className="nav__link">
                      <i className={`bx ${item.icon} nav__icon`}></i>
                      <span className="nav__name">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link to={""} className="nav__link" onClick={logOut}>
              <i className="bx bx-log-out nav__icon"></i>
              <span className="nav__name">Log Out</span>
            </Link>
          </nav>
        </div>
        <div className={classNames.divContent}>
          <Switch>
            <ContentRoute path="/admin" exact component={DashboardsItem} />
            <ContentRoute path="/admin/users" exact component={UsersManage} />
            <ContentRoute path="/admin/orders" exact component={OrderManage} />
            <ContentRoute
              path="/admin/products"
              exact
              component={ProductsManage}
              products={products}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Admin;
