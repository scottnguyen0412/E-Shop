import axios from 'axios';
import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar';

function Login() {

  const history = useHistory();
  // Get all value when user type anything
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
    error_list: [],
  })
  const handleInput = (e) => {
    e.persist();
    setLogin({...loginInput, [e.target.name]: e.target.value});
  }

  const loginSubmit = (e) => {
    // prevent reload page
    e.preventDefault();

    const data = {
      email:loginInput.email,
      password: loginInput.password
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`api/login`, data).then(res => {
        if(res.data.status === 200)
        {
          // Đăng nhập thành công thì sẽ lưu trữ token trong local storage
          localStorage.setItem('auth_token',res.data.token); //Lưu token vào biến auth_token
          localStorage.setItem('auth_name',res.data.username); //Lưu username của user vào auth_name
          swal("Success", res.data.message,"success")
          
          if(res.data.role === "admin")
          {
              history.push('/admin');
          }else
          {
            // after login success then redirect to home page
            history.push('/');
          }
        }
        else if(res.data.status === 401)
        {
          swal("Warning", res.data.message,"warning")
        }
        else
        {
            // Check error input when user submit
            setLogin({...loginInput, error_list: res.data.validation_errors});
        }
      })
    });
  }

  return (
    <div>
      <Navbar/>
      <div className='container py-5'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header bg-info'>
                    <h4 className='text-white text-center'>Login</h4>
                  </div>
                  <div className='card-body'>
                    <form onSubmit={loginSubmit}>
                      <div className='form-group mb-3'>
                        <label>Email*</label>
                        <input type="Text" name="email" onChange={handleInput} value={loginInput.email} className='form-control'  />
                        <span className='text-danger'>{loginInput.error_list.email}</span>
                      </div>
                      <div className='form-group mb-3'>
                        <label>Password*</label>
                        <input type="password" name="password" onChange={handleInput} value={loginInput.password} className='form-control'  />
                        <span className='text-danger'>{loginInput.error_list.password}</span>
                      </div>
                      <div className='form-group mb-3 text-center'>
                        <button type='submit' className='btn btn-primary '>Sign In</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>  
    </div>
  )
}

export default Login