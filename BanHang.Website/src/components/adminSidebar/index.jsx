import React, {useRef, useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link, Switch} from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import {ContentRoute} from "../../route/ContentRoute";
import UsersManage from "../../layouts/admin/UsersManage";
import Order from "../../layouts/admin/Order";
import ProductsManage from "../../layouts/admin/ProductsManage";

function Index() {
  const classNames1 = {
    bodyClassName: "",
    headerClassName: "header",
    divNeed: "l-navbar",
    navNeed: "nav",
    iconNeed: "bx bx-menu",
    divContent: "admin__content"
  };
  const classNames2 = {
    bodyClassName: "body-pd",
    headerClassName: "header header-pd",
    divNeed: "l-navbar show",
    navNeed: "nav show",
    iconNeed: "bx bx-menu bx-x",
    divContent: "admin__content extend"

  };
  const [classNames, setClassNames] = useState(classNames1);
  const [extend, setExtend] = useState(true);


  const showSidebar = () => {
    setExtend(!extend);
    if(extend === true) {
      setClassNames(classNames2);
    } else if (extend === false) {
      setClassNames(classNames1)
    }
  }
  console.log(extend);
  console.log(classNames)


  return (
    <>
      <div id="body-pd" className={classNames.bodyClassName}>
        <header className={classNames.headerClassName} id="header">
          <div className="header__toggle" onClick={() => showSidebar()}>
            <i className={classNames.iconNeed} id="header-toggle"></i>
          </div>

          <div className="header__img">
            <img src="assets/img/perfil.jpg" alt=""/>
          </div>
        </header>

        <div className={classNames.divNeed} id="nav-bar">
          <nav className={classNames.navNeed}>
            <div>
              <Link to={'/admin'} className="nav__logo">
                <i className='bx bx-layer nav__logo-icon'></i>
                <span className="nav__logo-name">Oganuceic</span>
              </Link>

              <div className="nav__list">
                <Link href="#" className="nav__link active">
                  <i className='bx bx-grid-alt nav__icon'></i>
                  <span className="nav__name">Dashboard</span>
                </Link>

                <Link href="#" className="nav__link">
                  <i className='bx bx-user nav__icon'></i>
                  <span className="nav__name">Users</span>
                </Link>

                <Link href="#" className="nav__link">
                  <i className='bx bx-message-square-detail nav__icon'></i>
                  <span className="nav__name">Messages</span>
                </Link>

                <Link href="#" className="nav__link">
                  <i className='bx bx-bookmark nav__icon'></i>
                  <span className="nav__name">Favorites</span>
                </Link>

                <Link href="#" className="nav__link">
                  <i className='bx bx-folder nav__icon'></i>
                  <span className="nav__name">Data</span>
                </Link>

                <Link href="#" className="nav__link">
                  <i className='bx bx-bar-chart-alt-2 nav__icon'></i>
                  <span className="nav__name">Analytics</span>
                </Link>
              </div>
            </div>

            <Link to={"/Home"} className="nav__link">
              <i className='bx bx-log-out nav__icon'></i>
              <span className="nav__name">Log Out</span>
            </Link>
          </nav>
        </div>
        <div className={classNames.divContent}>
          <Switch>
            <ContentRoute path="/admin" exact component={UsersManage}/>
            <ContentRoute path="/admin/orders" exact component={Order}/>
            <ContentRoute path="/admin/products" exact component={ProductsManage}/>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Index;