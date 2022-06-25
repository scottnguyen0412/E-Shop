import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function Cart() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    // Check trong local storage đã có auth_token của user chưa để có thể truy cập cart page
    if(!localStorage.getItem('auth_token'))
    {
        history.push('/');
        swal('Warning', 'Login to access Cart Page','error');
    }
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

    const handleDecrement = (cart_id) => {
        // Cập nhật số lượng product 
        setCart(cart =>
            cart.map( (item) => 
            // item.product_quantity >1 ? 1:0: Điều kiện quantity ko được bé hơn 1
                cart_id === item.id ? {...item, product_quantity: item.product_quantity - (item.product_quantity > 1 ? 1:0)} : item
            )    
        );
        updateCartQuantity(cart_id, "decrement")
    }

    const handleIncrement = (cart_id) => {
        // Cập nhật số lượng product 
        setCart(cart =>
            cart.map( (item) => 
            // item.product_quantity <10 ? 1:0 : Điều kiện quanity ko được lớn hơn 10
                cart_id === item.id ? {...item, product_quantity: item.product_quantity + (item.product_quantity <10 ? 1:0)} : item
            )    
        );
        updateCartQuantity(cart_id, "increment")

    }

    // update quantity in database
    function updateCartQuantity(cart_id, scope) {
        axios.post(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res => {
            if(res.data.status === 200)
            {
                // swal("Success", res.data.message, "success")
            }
        });
    }

    // remove item out of cart
    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();
        // console.log(cart_id);
        // anytime click thì giá trị sẽ có ngay lập tức
        const thisClicked  = e.currentTarget;
        thisClicked.innerText = "Removing";
        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res => {
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, "success");
                // remove table row(tr) out of section
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal('Error', res.data.message, 'error');
                thisClicked.innerText = "Remove";
            }
        });
    }
    
    if(loading)
    {
        return <h4>Loading Cart....
                    <img height="20px" src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-6.gif"/>
                </h4>
    }

    var cart_table = '';
    // check trong cart có item hay không
    if(cart.length >0)
    {
        cart_table = <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Product</th>
                                                    <th className='text-center'>Price</th>
                                                    <th className='text-center'>Quantity</th>
                                                    <th className='text-center'>Total Price</th>
                                                    <th className='text-center'>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map( (item, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td width="10%">
                                                                <img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} width="50px" height="50px"/>
                                                            </td>
                                                            <td>{item.product.name}</td>
                                                            <td width="15%" className='text-center'>{item.product.selling_price}</td>
                                                            <td width="15%">
                                                                <div className='input-group'>
                                                                    <button type='button' onClick={() => handleDecrement(item.id)} className='input-group-text btn btn-primary'>-</button>
                                                                    <div className='form-control text-center'>{item.product_quantity}</div>
                                                                    <button type='button' onClick={() => handleIncrement(item.id)} className='input-group-text btn btn-primary'>+</button>
                                                                </div>
                                                            </td>
                                                            <td width="15%" className='text-center'>{item.product.selling_price * item.product_quantity} $</td>
                                                            <td width="10%" className='text-center'>
                                                                <button type='button' onClick={ (e) => deleteCartItem(e, item.id)} className=" btn btn-danger btn-sm rounded-pill">
                                                                    <i className="fas fa-times-circle"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )    
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
    }
    else
     {
        cart_table = <div>
                        <div className='card card-body py-5 text-center shadow-sm'>
                            <h4 className='text-danger'>Your Shopping Cart is Empty</h4>
                        </div>
                    </div>
     }
    return (
            <div>
                <div>
                    <div className='py-3 bg-warning'>
                        <div className='container'>
                            <h6 className='text-white text-center'>Home / Cart</h6>
                        </div>
                    </div>
                    <div className='py-3'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    {cart_table}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Cart