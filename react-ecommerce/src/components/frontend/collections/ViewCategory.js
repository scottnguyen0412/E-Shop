import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

function ViewCategory() {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/getCategory`).then(res => {
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    // console.log(res.data.category);
                    // Get all value
                    setCategory(res.data.category);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        }
    }, [])

    if(loading)
    {
        return <h4 className='text-center'>Loading Category
                    <img height="20px" src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-6.gif"/>
                </h4>
    }
    else
    {
        var showCategoryList ='';
        showCategoryList = category.map((item, idx) => {
            return (
            <div className='col-md-4' key={idx}>
                <div className='card'>
                    {/* Link image */}
                    <Link to="">
                        <img src="" className='w-100' alt={item.name}/>
                    </Link>

                    <div className='card-body'>
                        <Link to={`collections/${item.slug}`}>
                            <h5>{item.name}</h5>
                        </Link>
                    </div>
                </div><br/>
            </div>
            )
        })
    }
    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6 className='text-white text-center'>Category Page</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        <h6>{showCategoryList}</h6>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ViewCategory