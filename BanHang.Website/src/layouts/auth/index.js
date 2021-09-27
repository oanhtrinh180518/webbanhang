import React from "react";
import {Switch} from "react-router-dom";
import {ContentRoute} from "../../route/ContentRoute";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import Page401 from "./Page401";

export default function Auth() {
    
    return(
        <div className="auth">
            <Switch>
                <ContentRoute path="/login" component={Login}/>
                <ContentRoute path="/register" component={Register}/>
                <ContentRoute path="/reset-password" component={ResetPassword}/>
                <ContentRoute path="/401-unauthorized-page" component={Page401}/>
            </Switch>
        </div>
    )
}


