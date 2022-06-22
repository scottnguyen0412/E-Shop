import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function EditCategory(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const[categoryInput, setCategory] = useState([]);
    const[error, setError] = useState([]);
    
    useEffect(() => {

        const category_id = props.match.params.id;
        // Get all data
        axios.get(`/api/edit-category/${category_id}`).then(
            res => { 
                if(res.data.status === 200)
                {
                    // Cập nhật category
                    setCategory(res.data.category);
                    // Cập nhật checkbox
                    setCheckbox(res.data.category);
                }
                else if (res.data.status === 404)
                {
                    swal('Error', res.data.message, 'error');
                    history.push('/admin/view-category');
                }
                // Sau khi load trong data thì sẽ ko cần load nữa nên sẽ false
                setLoading(false);
        })
    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value});

    }
    const [allCheckbox, setCheckbox] = useState([]);

    const handleCheckbox = (e) => {
        e.persist();
        // Get all input from user
        setCheckbox({...allCheckbox, [e.target.name]: e.target.checked});
    }

    // Update data
    const updateCategory = (e) => {
        e.preventDefault();

        // Biến "data" sẽ lưu giá trị của categoryInput
        const category_id = props.match.params.id;
        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: allCheckbox.status ? '1':'0',
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_description: categoryInput.meta_description,
        }
        axios.post(`/api/update-category/${category_id}`, data).then(res => {
            if(res.data.status === 200)
            {
                
                swal('Success', res.data.message, 'success');
                setError([]);
                history.push('/admin/view-category');
            }
            else if(res.data.status === 422)
            {
                swal("Input fields are empty", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404)
            {
                swal('Error', res.data.message, "error");
                history.push('/admin/view-category');
            }
        })
    }
    if(loading)
    {
        return <h4 className='text-center'>Loading Category
                    <img height="20px" src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-6.gif"/>
                </h4>
    }
    
    return (
        <div className='container px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4> 
                        Edit Category
                        <Link to="/admin/view-category" className="btn btn-outline-success btn-sm float-end">Back to view data</Link>
                    </h4>
                </div>
            <div className='card-body'>
            <form onSubmit={updateCategory}>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="seo-tags-tab" data-toggle="tab" href="#seo-tags" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className='form-group mb-3'>
                                <label>Slug</label>
                                <input type='text' name='slug' onChange={handleInput} value={categoryInput.slug} className='form-control' />
                                {/* <span className='text-danger'>{categoryInput.error_list.slug}</span> */}
                                <small className='text-danger'>{error.slug}</small>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Name</label>
                                <input type='text' name='name' onChange={handleInput} value={categoryInput.name} className='form-control' />
                                {/* <span className='text-danger'>{categoryInput.error_list.name}</span> */}
                                <small className='text-danger'>{error.name}</small>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Description</label>
                                <textarea type='text' name='description' onChange={handleInput} value={categoryInput.description} className='form-control'></textarea>
                            </div>
                            <div className='form-group mb-3'>
                                <label className="p-2">Status</label>
                                <input type="checkbox" onChange={handleCheckbox} defaultChecked={allCheckbox.status === 1 ? true:false} name='status' /> Status: 0=shown/1=hide
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                            <div className='form-group mb-3'>
                                <label>Meta Title</label>
                                <input type='text' name='meta_title' onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
                                {/* <span className='text-danger'>{categoryInput.error_list.meta_title}</span> */}
                                <small className='text-danger'>{error.meta_title}</small>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Meta Keywords</label>
                                <input type='text' name='meta_keyword' onChange={handleInput} value={categoryInput.meta_keyword} className='form-control' />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Meta Description</label>
                                <textarea type='text' name='meta_description' onChange={handleInput} value={categoryInput.meta_description} className='form-control'></textarea>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-outline-primary px-4 float-end'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditCategory