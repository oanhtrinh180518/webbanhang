import React from "react";
import { FaChevronDown } from "react-icons/fa";

function HeaderTop(props) {
  return (
    <>
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div
                className="
                  header__top-content
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <div className="header__top-content--left">
                  <span>
                    Free Delivery: Take advantage of our time to save event
                  </span>
                </div>
                <ul className="header__top-content--right user-set-role d-flex">
                  <li className="user-currency pos-relative">
                    <a
                      className="user-set-role__button"
                      href="#abc"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select Language
                      <FaChevronDown className="m-sm-2" />
                    </a>
                    <ul className="expand-dropdown-menu dropdown-menu">
                      <li>
                        <a href="#abc">English</a>
                      </li>
                      <li>
                        <a href="#abc">French</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderTop;
