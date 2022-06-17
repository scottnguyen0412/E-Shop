import React, { useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';

// Sweet alert
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function Register() {

  const history = useHistory();

  // registerInput: get value from user and assign in registerInput
  const [registerInput, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    // ...registerInput: Lấy all giá trị user đã nhập
    setRegister({...registerInput, [e.target.name]: e.target.value});
  }

  const registerSubmit = (e) => {
    e.preventDefault();
      // Lấy tất cả dữ liệu mỗi khi submit
      const data = {
        name: registerInput.name,
        email: registerInput.email,
        password: registerInput.password,
      }
      axios.get('/sanctum/csrf-cookie').then(response => {
          axios.post(`/api/register`,data).then(res => {
            if(res.data.status === 200)
            {
                // Lưu trữ data trong localStorage
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                // notification message success
                swal('Success', res.data.message, 'success');
                history.push('/');

            }
            else
            {
              // trả về lỗi khi người dùng input
              setRegister({...registerInput,error_list: res.data.validation_errors});
            }
          });
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
                    <h4 className='text-white text-center'>Register</h4>
                  </div>
                  <div className='card-body'>
                    <form onSubmit={registerSubmit}>
                      <div className='form-group mb-3'>
                        <label>Full Name*</label>
                        <input type="text" name="name" onChange={handleInput} value={registerInput.name} className='form-control'/>
                        <span className='text-danger'>{registerInput.error_list.name}</span>
                      </div>
                      <div className='form-group mb-3'>
                        <label>Email*</label>
                        <input type="Text" name="email" onChange={handleInput} value={registerInput.email} className='form-control' />
                        <span className='text-danger'>{registerInput.error_list.email}</span>

                      </div>
                      <div className='form-group mb-3'>
                        <label>Password*</label>
                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} className='form-control' />
                        <span className='text-danger'>{registerInput.error_list.password}</span>
                      </div>
                      <div className='form-group mb-3 text-center'>
                        <button type='submit' className='btn btn-primary '>Sign Up</button>
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

export default Register;