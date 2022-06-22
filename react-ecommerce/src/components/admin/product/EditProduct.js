import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';

function EditProduct(props) {

    const history = useHistory();
    const [categorylist, setCategorylist] = useState([]);
    const [loading, setLoading] = useState(true);

    const [productInput, setProduct] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',

        meta_title: '',
        meta_keyword: '',
        meta_description: '',

        selling_price: '',
        original_price: '',
        quantity: '',
        brand: '',
    });

  const [picture, setPicture] = useState([]);
  const[errorlist, setError] = useState([]);

  const handleInput = (e) => {
    e.persist();
    // Get all input from user
    setProduct({...productInput, [e.target.name]: e.target.value});
  }

  const [allCheckbox, setCheckbox] = useState([]);

  // handle Checkbox
  const handleCheckbox = (e) => {
    e.persist();
    // Get all input from user
    setCheckbox({...allCheckbox, [e.target.name]: e.target.checked});
  }

  const handleImage = (e) => {
    // Get input image from user
    setPicture({ image: e.target.files[0] });
  }

  useEffect(() => {
    // Get all category
    axios.get(`/api/all-category`).then(res=> {
      if(res.data.status === 200)
      {
        setCategorylist(res.data.category);
      }
    })

     const product_id = props.match.params.id;
     axios.get(`/api/edit-product/${product_id}`).then(res=>{
        if(res.data.status === 200)
        {
            // console.log(res.data.products);
            setProduct(res.data.products);

            //Get value of checkbox
            setCheckbox(res.data.products); 
        }
        else if(res.data.status === 404)
        {
            swal('Error', res.data.message, 'error');
            history.push('/admin/view-product');
        }
        // Sau khi load trong data thì sẽ ko cần load nữa nên sẽ false
        setLoading(false);
     });
  },[props.match.params.id, history]);

  
  
  const updateProduct = (e) => {
    e.preventDefault();
    const product_id = props.match.params.id;
    // Vì có sử dụng type="file" trong input nên sẽ sử dụng FormData()
    const formData = new FormData();
    formData.append('image', picture.image);

    formData.append('category_id', productInput.category_id);
    formData.append('slug', productInput.slug);
    formData.append('name', productInput.name);
    formData.append('description', productInput.description);
    formData.append('meta_title', productInput.meta_title);
    formData.append('meta_keyword', productInput.meta_keyword);
    formData.append('meta_description', productInput.meta_description);
    formData.append('selling_price', productInput.selling_price);
    formData.append('original_price', productInput.original_price);
    formData.append('quantity', productInput.quantity);
    formData.append('brand', productInput.brand);
    formData.append('featured', allCheckbox.featured ? '1':'0');
    formData.append('popular', allCheckbox.popular ? '1':'0');
    formData.append('status', allCheckbox.status ? '1':'0');
    axios.post(`/api/update-product/${product_id}`,formData).then(res => {
      if(res.data.status === 200)
      {
        swal('Success', res.data.message, 'success');
        // Khi các input được điền thì sẽ remove các error ra khỏi 
        setError([]);
        history.push('/admin/view-product');
      }
      else if(res.data.status === 422)
      {
        swal("All Fields are requied","",'error');
        setError(res.data.errors);
      }
      else if(res.data.status === 404)
      {
        swal('Error', res.data.message, 'error');
        history.push('/admin/view-product');
      }
    });
  }
  if(loading)
      {
          return <h4 className='text-center'>Edit Product
                        <img height="20px" src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-6.gif"/>
                    </h4>
      }
  return (
    <div className='container-fluid px-4'>
      <div className='card mt-4'>
        <div className='card-header'>
          <h4> Edit Product
            <Link to="/admin/view-product" className='btn btn-outline-primary btn-sm float-end'>View Product</Link>
          </h4>
        </div>
        <div className='card-body'>
          {/* Vì có gửi hình ảnh nên sẽ cần encType="multipart/form-data"*/}
          <form onSubmit={updateProduct} encType='multipart/form-data'>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="seotags-tab" data-toggle="tab" href="#seotags" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="contact-tab" data-toggle="tab" href="#otherdetails" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div className='form-group mb-3 font-weight-bold'>
                <label>Select Category</label>
                <select name='category_id' onChange={handleInput} value={productInput.category_id} className='form-select'>
                  <option>Select Category</option>
                  {
                    categorylist.map((item) => {
                      return (
                        // give key unique to looping
                        <option value={item.id} key={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
                <small className='text-danger'>{errorlist.category_id}</small>
              </div>
              <div className='form-group mb-3 font-weight-bold'>
                <label>Slug</label>
                <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className='form-control'/>
                <small className='text-danger'>{errorlist.slug}</small>
              </div>
              <div className='form-group mb-3 font-weight-bold'>
                <label>Name</label>
                <input type="text" name="name" onChange={handleInput} value={productInput.name} className='form-control'/>
                <small className='text-danger'>{errorlist.name}</small>
              </div>
              <div className='form-group mb-3 font-weight-bold'>
                <label>Description</label>
                <textarea name="description" onChange={handleInput} value={productInput.description} className='form-control'></textarea>
              </div>
            </div>
            <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
              <div className='form-group mb-3 font-weight-bold'>
                <label>Meta Title</label>
                <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className='form-control'/>
                <small className='text-danger'>{errorlist.meta_title}</small>
              </div>
              <div className='form-group mb-3 font-weight-bold'>
                <label>Meta Keyword</label>
                <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className='form-control'></textarea>
              </div>
              <div className='form-group mb-3 font-weight-bold'>
                <label>Meta Description</label>
                <textarea name="meta_description" onChange={handleInput} value={productInput.meta_description} className='form-control'></textarea>
              </div>
            </div>
            <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
              <div className='row'>
                <div className='col-md-4 form-group mb-3 font-weight-bold'>
                  <label>Selling Price</label>
                  <input type="text" name='selling_price' onChange={handleInput} value={productInput.selling_price} className='form-control' />
                  <small className='text-danger'>{errorlist.selling_price}</small>
                </div>
                <div className='col-md-4 form-group mb-3 font-weight-bold'>
                  <label>Original Price</label>
                  <input type="text" name='original_price' onChange={handleInput} value={productInput.original_price} className='form-control' />
                  <small className='text-danger'>{errorlist.original_price}</small>
                </div>
                <div className='col-md-4 form-group mb-3 font-weight-bold'>
                  <label>Quantity</label>
                  <input type="text" name='quantity' onChange={handleInput} value={productInput.quantity} className='form-control' />
                  <small className='text-danger'>{errorlist.quantity}</small>
                </div>
                <div className='col-md-4 form-group mb-3 font-weight-bold'>
                  <label>Brand</label>
                  <input type="text" name='brand' onChange={handleInput} value={productInput.brand} className='form-control' />
                  <small className='text-danger'>{errorlist.brand}</small>
                </div>

                <div className='col-md-8 form-group mb-3 font-weight-bold'>
                  <label>Image</label>
                  <input type="file" name='image' onChange={handleImage} className='form-control' />
                  <img src={`http://localhost:8000/${productInput.image}`} width='50px' alt={productInput.name} />
                  <small className='text-danger'>{errorlist.image}</small>
                </div>

                <div className='col-md-4 form-group mb-3 font-weight-bold'>
                  <label>Featured (Checked=shown)</label><br/>
                  <input type="checkbox" name='featured' onChange={handleCheckbox} defaultChecked={allCheckbox.featured === 1 ? true:false} className="col-md-8"/>
                </div>
                <div className='col-md-4 form-group mb-3 font-weight-bold'>
                  <label>Popular (Checked=shown)</label><br/>
                  <input type="checkbox" name='popular' onChange={handleCheckbox} defaultChecked={allCheckbox.popular === 1 ? true:false} className="col-md-8"/>
                </div>
                <div className='col-md-4 form-group mb-3 font-weight-bold'>
                  <label>Status (Checked=hidden)</label><br/>
                  <input type="checkbox" name='status' onChange={handleCheckbox} defaultChecked={allCheckbox.status === 1 ? true:false} className="col-md-8"/>
                </div>
                  <button type='submit' className='btn btn-outline-primary px-4 mt-2'>
                    Update Product
                  </button>
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProduct