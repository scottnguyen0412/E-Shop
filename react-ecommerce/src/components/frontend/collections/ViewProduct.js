import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function ViewProduct(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);

    // check product available
    const productCount = product.length;
    useEffect(() => {
        // được gắn vào
        let isMounted = true

        // Get slug of product
        const product_slug = props.match.params.slug;
        axios.get(`/api/fetchproducts/${product_slug}`).then(res=> {
            // Nếu được gắn vào
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    // Get value
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
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
    }, [props.match.params.slug, history])

    if(loading)
    {
        return <h4>Loading Product....
                    <img height="20px" src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-6.gif"/>
                </h4>
    }
    else
    {
        var showProductList ='';
        if(productCount)
        { 
            showProductList = product.map((item, idx)=>{
                return (
                    <div className='col-md-3' key={idx}>
                        <div className='card'>
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                <img src={`http://localhost:8000/${item.image}`} className='w-100' alt={item.name} />
                            </Link>
                            <div className='card-body'>
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h5>{item.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        else
        {
            showProductList = 
                    <div className='col-md-12'>
                        <h4 className='text-danger'>No Product Available for {category.name}</h4>
                    </div>
        }
    }
    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6 className='text-white text-center'>Collections / {category.name}</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ViewProduct