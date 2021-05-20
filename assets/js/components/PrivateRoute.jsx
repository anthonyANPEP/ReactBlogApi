import React from 'react'
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';


function PrivateRoute({path,isAuthenticated,component}) {
    return isAuthenticated ? <Route path={path} component={component} /> : <Redirect to="/login" />;
}
 
export default PrivateRoute;