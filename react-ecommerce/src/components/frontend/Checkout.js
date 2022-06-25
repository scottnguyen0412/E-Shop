import React, {useEffect, useState} from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function Checkout() {
    const history = useHistory();
    // Check trong local storage đã có auth_token của user chưa để có thể truy cập cart page
    if(!localStorage.getItem('auth_token'))
    {
        history.push('/');
        swal('Warning', 'Login to access Cart Page','error');
    }
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [error, setError] = useState([]);

    useEffect(() => {
        // được gắn vào
        let isMounted = true

        axios.get(`/api/cart`).then(res=> {
            // Nếu được gắn vào
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    // Get value
                    setCart(res.data.cart);

                    setLoading(false);
                }
                // 401 means you are unauthorized
                else if(res.data.status === 401)
                {
                    history.push('/');
                    swal('Warning', res.data.message, "error");
                }
            }
        })
        return () => {
            isMounted = false
      }
    }, [history])

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value});
    }

    const submitOrder = (e) => {
        e.preventDefault();
        const data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode
        }

        axios.post(`/api/place-order`, data).then(res => {
            if(res.data.status === 200)
            {
                swal("Order placed Successfully", res.data.message, "success");
                // Nếu input from user correct thì remove error 
                setError([])
                history.push("/thank-you");
            }
            // 422 means input feilds from user error
            else if (res.data.status === 422)
            {
                swal("All feilds are empty or missing", "", "error");
                setError(res.data.errors);
            }
        })
    }

    if(loading)
    {
        return <h4>Loading Checkout....
                    <img height="20px" src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-6.gif"/>
                </h4>
    }

    var checkout_table = '';
    if(cart.length > 0)
    {
        checkout_table = <div>
                        <div className='row'>
                                    <div className='col-md-7'>
                                        <div className='card'>
                                            <div className='card-header'>
                                                <h4>Basic Information</h4>
                                            </div>
                                            <div className='card-body'>
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className='form-group mb-3'>
                                                            <label>First Name</label>
                                                            <input type="text" name='firstname' onChange={handleInput} value={checkoutInput.firstname} className='form-control' />
                                                            <small className='text-danger'>{error.firstname}</small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='form-group mb-3'>
                                                            <label>Last Name</label>
                                                            <input type="text" name='lastname' onChange={handleInput} value={checkoutInput.lastname} className='form-control' />
                                                            <small className='text-danger'>{error.lastname}</small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='form-group mb-3'>
                                                            <label>Phone Number</label>
                                                            <input type="number" name='phone' onChange={handleInput} value={checkoutInput.phone} className='form-control' />
                                                            <small className='text-danger'>{error.phone}</small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='form-group mb-3'>
                                                            <label>Email Address</label>
                                                            <input type="email" name='email' onChange={handleInput} value={checkoutInput.email} className='form-control' />
                                                            <small className='text-danger'>{error.email}</small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <div className='form-group mb-3'>
                                                            <label>Full Address</label>
                                                            <textarea rows="3" name='address' onChange={handleInput} value={checkoutInput.address} className='form-control'></textarea>
                                                            <small className='text-danger'>{error.address}</small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='form-group mb-3'>
                                                            <label>City</label>
                                                            <input type="text" name='city' onChange={handleInput} value={checkoutInput.city} className='form-control' />
                                                            <small className='text-danger'>{error.city}</small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='form-group mb-3'>
                                                            <label>State</label>
                                                            <input type="text" name='state' onChange={handleInput} value={checkoutInput.state} className='form-control' />
                                                            <small className='text-danger'>{error.state}</small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='form-group mb-3'>
                                                            <label>Zip Code</label>
                                                            <input type="text" name='zipcode' onChange={handleInput} value={checkoutInput.zipcode} className='form-control' />
                                                            <small className='text-danger'>{error.zipcode}</small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <div className='form-group text-end'>
                                                            <button type='button' className='btn btn-primary' onClick={submitOrder}><i className="fas fa-credit-card"> Place Order</i></button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-5'>
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th width="50%">Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map( (item, idx) => {
                                                    totalCartPrice += item.product.selling_price * item.product_quantity;
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{item.product.name}</td>
                                                            <td>{item.product.selling_price}</td>
                                                            <td>{item.product_quantity}</td>
                                                            <td>{item.product.selling_price * item.product_quantity} $</td>
                                                        </tr>
                                                    ) 
                                                })}
                                                    <tr>
                                                        <td colSpan="2" className="text-end fw-bold">Grand Total</td>
                                                        <td colSpan="2" className="text-end fw-bold ">{totalCartPrice} $</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                    </div>
    }
    else
    {
        checkout_table = <div>
                        <div className='card card-body py-5 text-center shadow-sm'>
                            <h4 className='text-danger'>Your Shopping Cart is Empty. Tou are in Checkout Page</h4>
                        </div>
                    </div>
    }
    return (
        <div>
            <div className='py-3 bg-warning'>
                            <div className='container'>
                                <h6 className='text-white text-center'>Home / Checkout</h6>
                            </div>
                        </div>
                        <div className='py-3'>
                            <div className='container'>
                                    {checkout_table}
                                </div>
                            </div>
        </div>
    )
}

export default Checkout