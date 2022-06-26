import React, { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';


function ProductDetail(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

    const [quantity, setQuantity] = useState(1);
    
    useEffect(() => {
        // được gắn vào
        let isMounted = true

        // Get slug of product and category
        const category_slug = props.match.params.category;
        const product_slug = props.match.params.slug;
        axios.get(`/api/view-products/${category_slug}/${product_slug}`).then(res=> {
            // Nếu được gắn vào
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    // Get value
                    setProduct(res.data.product);

                    setLoading(false);
                }
                else if(res.data.status === 400)
                {
                    swal('Warning', res.data.message, 'Warning');
                }
                else if(res.data.status === 404)
                {
                    history.push('/collections');
                    swal('Warning', res.data.message, "error");
                }
            }
        })
        return () => {
            isMounted = false
      }
    }, [props.match.params.category ,props.match.params.product, history])

    // Quantity decrement
    const handleDecrement = () => {
        // Nếu quanity lớn hơn 1 thì không được phép nhấn giảm
        if(quantity > 1)
        {
            setQuantity(prevCount => prevCount - 1);
        }
    }

    // Quanity increment
    const handleIncrement = () => {
        // Nếu quantity bé hơn 10 thì được nhấn tăng
        {
            setQuantity(prevCount => prevCount + 1);
        }
    }

    const submitAddtocart = (e) => {
        e.preventDefault();

        const data = {
            // get product id from hook product
            product_id: product.id,
            // get quantity from hook quantity
            product_quantity: quantity,
        }

        axios.post(`/api/add-to-cart`,data).then(res => {
            if(res.data.status === 201)
            {
                swal("Success", res.data.message,"success")
            }
            else if(res.data.status === 409)
            {
                swal("Warning", res.data.message, "warning")
            }
            else if (res.data.status === 401)
            {
                swal('Error', res.data.message, 'error');
                history.push('/register');
            }
            else if (res.data.status === 404)
            {
                swal('Warning', res.data.message, 'warning')
            }
        })
    }

    if(loading)
    {
        return <h4>Loading Product Detail....
                    <img height="20px" src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-6.gif"/>
                </h4>
    }
    else
    {
        var available_stock = '';
        if(product.quantity > 0)
        {
            available_stock = <div>
                        <label className='btn-sm btn-success px-4 mt-2'>In Stock</label>
                                        <div className='row'>
                                            <div className='col-md-3 mt-3'>
                                                <div className='input-group'>
                                                    <button type='button' onClick={handleDecrement} className='input-group-text'>-</button>
                                                    <div className='form-control text-center' >{quantity}</div>
                                                    <button type='button' onClick={handleIncrement} className='input-group-text'>+</button>
                                                </div>
                                            </div>
                                            <div className='col-md-3 mt-3'>
                                                <button type='button' className='btn btn-primary w-100' onClick={submitAddtocart}>Add to Cart</button>
                                            </div>
                                        </div>
                            </div>
        }
        else
        {
            available_stock = <div>
                                <label className='btn-sm btn-danger px-4 mt-2'>Out of Stock</label>
                            </div>
        }
    }

    return (
            <div>
                <div>
                    <div className='py-3 bg-warning'>
                        <div className='container'>
                            <h6 className='text-white text-center'>Collections / {product.category.name} / {product.name}</h6>
                        </div>
                    </div>
                    <div className='py-3'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-4 border-end'>
                                    <img src={`http://localhost:8000/${product.image}`} alt={product.name} className='w-100'/>
                                </div>

                                <div className='col-md-8'>
                                    <h4>
                                        {product.name} 
                                        <span className='float-end badge btn-sm btn-danger badge-pil'>{product.brand}</span>
                                    </h4>
                                    <p>{product.description}</p>
                                    <h4 className='mb-1'>
                                        $ {product.selling_price}
                                        <s className='ms-2'>$ {product.original_price} </s>
                                    </h4>
                                    <div>
                                        {available_stock}
                                    </div>
                                    <button type='button' className='btn btn-danger mt-3'>Add to Wishlist</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ProductDetail