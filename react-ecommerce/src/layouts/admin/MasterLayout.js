
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

import routes from '../../routes/routes';
// link Style
import '../../assets/admin/vendor/fontawesome-free/css/all.min.css';
import '../../assets/admin/css/sb-admin-2.min.css';
import '../../assets/admin/vendor/jquery/jquery.min.js';
import '../../assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js';
import '../../assets/admin/vendor/jquery-easing/jquery.easing.min.js';
// Toogle sidebar
// import '../../assets/admin/js/sb-admin-2.min.js';

import { Switch, Route, Redirect } from 'react-router-dom';

const MasterLayout= () => {
  return (
    <div className='page' id="page-top">
        <div id="wrapper">
            <Sidebar/>
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
            <Navbar/>
              <main>
                <Switch>
                  {
                    routes.map((route, index)=>{
                      return(
                        route.component && (
                          <Route
                            key = {index}
                            path = {route.path}
                            exact = {route.exact}
                            name = {route.name}
                            render = {(props) => (
                              <route.component {...props}/>
                            )}
                          />
                        )
                      )
                    })
                  }
                  {/* Auto redirect admin dashboard when access to web */}
                  <Redirect from='/admin' to='/admin/dashboard'/>
                </Switch>
              </main>
            </div>
        <Footer/>
        </div>
    </div>
    </div>
  );
}

export default MasterLayout