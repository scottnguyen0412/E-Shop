import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import axios from 'axios';
// import MasterLayout from './layouts/admin/MasterLayout';
import Register from './components/frontend/auth/Register';
import Login from './components/frontend/auth/Login';
import AdminPrivateRoute from './AdminPrivateRoute';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';
import PublicRoute from './PublicRoute';

// Note: must use localhost:8000
axios.defaults.baseURL = "http://localhost:8000/";
// Mỗi lần request được gửi đến thì dều accept
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

// get bearer token
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/403" component={Page403}/>
            <Route path="/404" component={Page404}/>

            <Route path="/login">

              {/* Nếu user đã đăng nhập mà tự chỉnh trên thanh url ví dụ: /login thì hệ thống sẽ check
                  người dùng đã đăng nhập hay chưa bằng cách check token trong local storage.
                  Nếu đã đăng nhập mà còn chỉnh trên thanh url: /login thì hệ thống sẽ tự chuyển hướng đến Home page
              */}
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login/>}
            </Route>
            <Route path="/register">
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register/>}
            </Route>

            {/* <Route exact path="/" component={Home}/>
            <Route exact path="/About" component={About}/>
          <Route exact path="/Contact" component={Contact}/> */}

            {/* <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props}/>} /> */}
            
            {/* Route for admin dashboard */}
            <AdminPrivateRoute path="/admin" name="Admin"/>
            {/* Route for frontend */}
            <PublicRoute path="/" name="Home" />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
