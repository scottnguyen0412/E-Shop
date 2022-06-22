import React from 'react';
import publicRouteList from '../../routes/publicRouteList';
import Navbar from './Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';

const FrontendLayout= () => {
  return (
        <div>
            <Navbar/>
                <Switch>
                  {
                    publicRouteList.map((routedata, index)=>{
                      return(
                        routedata.component && (
                          <Route
                            key = {index}
                            path = {routedata.path}
                            exact = {routedata.exact}
                            name = {routedata.name}
                            render = {(props) => (
                              <routedata.component {...props}/>
                            )}
                          />
                        )
                      )
                    })
                  }
                  {/* Auto redirect admin dashboard when access to web */}
                  <Redirect from='/admin' to='/admin/dashboard'/>
                </Switch>
    </div>
  );
}

export default FrontendLayout