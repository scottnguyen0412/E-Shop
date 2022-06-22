import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

function ViewCategory() {
    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
        
        //Get data 
        axios.get(`api/view-category`).then(res => {
            // console.log(res.data.category);
            // If phản hồi = 200 thì thành công
            if(res.status === 200)
            {
                // res.data.category: category này được xử lí bên laravel
                setCategorylist(res.data.category)
            }
            setLoading(false);

        });
    
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        // Hiển thị text deleting khi click button delete
        thisClicked.innerText = "Deleting";
        axios.delete(`/api/delete-category/${id}`).then(res => {
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, "success");
                // Nó sẽ tìm cái id của table row (tr) muốn xóa và remove
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    var viewcategory_byTable = "";
    if(loading)
    {
        return <h4 className='text-center'>Loading Category
                    <img height="20px" src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-6.gif"/>
                </h4>
    }
    else
    {
        // map() truy cập mảng và lặp để lấy data
        viewcategory_byTable = categorylist.map( (item) => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td className='dropdown'>
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            Action          
                        <span className="caret"></span></button>
                        <div className="dropdown-menu">
                            <li><Link className='dropdown-item' to={`edit-category/${item.id}`}>Edit</Link></li>
                            <li><button type='submit' onClick={(e) => {if(window.confirm("Are you sure to delete this category?")){{deleteCategory(e, item.id)}}}} className='dropdown-item'>Delete</button></li>
                        </div>
                    </td>
                </tr>
            )
        })  
    }


    
    return (
        <div className='container px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>
                        Category List
                        <Link to="/admin/add-category" className='btn btn-outline-primary btn-sm float-end'>Add Category</Link>
                    </h4>
                </div>
                <div className='card-body'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Action</th>
                                {/* <th className='dropdown'>
                                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                    Action          
                                    <span class="caret"></span></button>
                                    <div class="dropdown-menu">
                                        <a href="#">Edit</a>
                                        <a href="#">Delete</a>
                                    </div>
                                </th>                                 */}
                            </tr>
                        </thead>
                        <tbody>
                                {viewcategory_byTable}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewCategory