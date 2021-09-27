import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import NormalRoute from "./route/NormalRoute";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Views from "./layouts/views";
import Auth from "./layouts/auth";
import ProtectedRoute from "./route/ProtectedRoute";
import Admin from "./layouts/admin";
import ScrollArrow from "./components/shared/ScrollArrow";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken, userSelector, setAuth } from "./app/userSlice";
import AutoScrollTop from "./components/shared/AutoScrollTop";

function App() {
  const [cookie] = useCookies();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const getData = () => {
    if (user.userInfo == null) {
      dispatch(getUserByToken());
    }
  };
  useEffect(() => {
    if (cookie["access_token"]) {
      dispatch(setAuth(cookie["access_token"]));
      getData();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      <AutoScrollTop />
      <Switch>
        <NormalRoute path="/home" component={Views} />
        <NormalRoute path="/product" component={Views} />
        <NormalRoute path="/product-detail" component={Views} />
        <NormalRoute path="/cart" component={Views} />
        <NormalRoute path="/userProfile" component={Views} />
        <NormalRoute path="/check-out" component={Views} />
        <NormalRoute path="/check-out-success" component={Views} />

        <NormalRoute path="/login" component={Auth} />
        <NormalRoute path="/register" component={Auth} />
        <Route path="/reset-password" component={Auth} />
        <NormalRoute path="/401-unauthorized-page" component={Auth} />

        <ProtectedRoute path="/admin/dashboard" component={Admin} />
        <ProtectedRoute path="/admin/order" component={Admin} />
        <ProtectedRoute path="/admin" component={Admin} />
        <ProtectedRoute path="/admin/products" component={Admin} />
        {/*all of wrong url will be redirect to home*/}
        <Redirect from="*" to="/home" />
      </Switch>
      <ScrollArrow />
    </BrowserRouter>
  );
}

export default App;
