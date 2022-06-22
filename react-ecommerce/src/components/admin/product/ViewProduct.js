import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
function ViewProduct() {

  // vì có nhiều dữ liệu nên useState([]) được sử dụng mảng
  const [viewProduct, setProduct] = useState([]);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'View Product';

    // fetch data
    axios.get(`/api/view-product`).then(res => {
        if(res.data.status === 200)
        {
          // console.log(res.data.products);
          setProduct(res.data.products);
          setLoading(false);
        }
    });
  },[]);

  var display_productTable ='';

  if(loading)
  {
      return  <h4 className='text-center'>Loading view products
                    <img height="20px" src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-6.gif"/>
              </h4>
  }
  else
  {
      display_productTable = viewProduct.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.category.name}</td>
            <td>{item.name}</td>
            <td>{item.selling_price}</td>

            {/* Display image */}
            <td><img src={`http://localhost:8000/${item.image}`} width='50px' alt={item.name}/></td>
            <td className='dropdown'>
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            Action          
                        <span className="caret"></span></button>
                        <div className="dropdown-menu">
                            <li><Link className='dropdown-item' to={`edit-product/${item.id}`}>Edit</Link></li>
                            {/* <li><button type='submit' onClick={(e) => {if(window.confirm("Are you sure to delete this product?")){{deleteProduct(e, item.id)}}}} className='dropdown-item'>Delete</button></li> */}
                        </div>
            </td>

          </tr>
        )
      })
  }
  

  return (
    <div className='card px-4 mt-3'>
      <div className='card mt-4'>
        <div className='card-header'>
          <h4>View Product
            <Link to="/admin/add-product" className="btn btn-outline-primary btn-sm float-end">Add Product</Link>
          </h4>
        </div>
        <div className='card-body'>
            <table className='table table-bordered table-striped'>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Product Name</th>
                  <th>Selling Price</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {display_productTable}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default ViewProduct