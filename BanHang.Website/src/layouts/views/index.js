import React from "react";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../route/ContentRoute";
import Home from "./Home";
import Product from "./Product";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";
import ProductDetail from "./ProductDetail";
import UserProfile from "./UserProfile";
import Cart from "./Cart";
import Checkout from "./Checkout";
import CheckOutSuccess from "./CheckOutSuccess";
import Page401 from "../auth/Page401";

export default function Views() {
  return (
    <>
      <div className="home-header">
        <Header />
      </div>
      <div className="home-body">
        <div>
          <Switch>
            <ContentRoute path="/home" component={Home}/>
            <ContentRoute path="/product" component={Product}/>
            <ContentRoute path="/cart" component={Cart}/>
            <ContentRoute path="/check-out" component={Checkout}/>
            <ContentRoute path="/check-out-success" component={CheckOutSuccess}/>

            <ContentRoute path="/product-detail/*" component={ProductDetail}/>
            <ContentRoute path="/userProfile" component={UserProfile}/>
          </Switch>
        </div>
      </div>
      <div className="home-footer m-t-50">
        <Footer />
      </div>
    </>
  );
}
