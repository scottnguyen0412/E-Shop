import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

function Category() {

    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
        e.preventDefault();
        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_description: categoryInput.meta_description,
        }

        axios.post(`api/store-category`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                document.getElementById('Category_form').reset();
            }
            else if (res.data.status === 400) {
                setCategory({ ...categoryInput, error_list: res.data.errors });
            }
            else {

            }
        });
    }

    var display_errors = [];
    if(categoryInput.error_list)
    {
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.meta_title,
        ]
    }
    else
    {

    }

    return (
        <div className='container-fluid px-4'>
            <h1 className='mt-4'>Category</h1>

            {display_errors.map((items) => {
                return( <p className='text-danger' key={items}>{items}</p>)
            })}
            
            <form onSubmit={submitCategory} id="Category_form">
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
                        </div>
                        <div className='form-group mb-3'>
                            <label>Name</label>
                            <input type='text' name='name' onChange={handleInput} value={categoryInput.name} className='form-control' />
                            {/* <span className='text-danger'>{categoryInput.error_list.name}</span> */}
                        </div>
                        <div className='form-group mb-3'>
                            <label>Description</label>
                            <textarea type='text' name='description' onChange={handleInput} value={categoryInput.description} className='form-control'></textarea>
                        </div>
                        <div className='form-group mb-3'>
                            <label className="p-2">Status</label>
                            <input type="checkbox" onChange={handleInput} value={categoryInput.status} name='status' /> Status: 0=shown/1=hide
                        </div>
                    </div>
                    <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                        <div className='form-group mb-3'>
                            <label>Meta Title</label>
                            <input type='text' name='meta_title' onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
                            {/* <span className='text-danger'>{categoryInput.error_list.meta_title}</span> */}
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
                    <button type='submit' className='btn btn-outline-primary px-4 float-end'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Category