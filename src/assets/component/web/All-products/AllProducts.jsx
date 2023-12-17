import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import './allProduct.css'
import { Link } from 'react-router-dom';

export default function AllProducts() {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotalPages] = useState(1);
    const [pages, setPages] = useState(1)
    const limit = 3;

    // const pages = totalPages / page;
    const getAllProduct = async(page)=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}`)
      //   console.log(data);
      //   console.log(data.products);
      // console.log(data.total);
      setProducts(data.products);
      setTotalPages(data.total);
     console.log(data.total/data.page)
     setPages(data.total/data.page)

      return data
    }
    
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= pages) {
        setCurrentPage(newPage);
      }}
    
    useEffect(()=>{
        getAllProduct(currentPage, limit) 
    },[currentPage, limit])
    return (
        <div className='container'>
          <div className='row mt-5'>
            {products.map((ele, index) => (
                <>
                <div className='col-md-3 smsm' key={ele._id}>
              <img src={ele.mainImage.secure_url }  className='w-50 imagy '/>
              <div  className='product-name mt-3'>{ele.name}</div>

             </div> </>
            ))}
          </div>


          <nav aria-label="Page navigation example   ">
  <ul className="pagination Page">
    <li className="page-item">
      <Link className="page-link" to={`/products/page=${currentPage - 1}`} onClick={() => handlePageChange(currentPage - 1)}  disabled={currentPage === 1}>
        Previous
      </Link>
    </li>
    {Array.from({ length: Math.ceil(pages) }, (_, index) => index + 1).map((page) => (
    <li className="page-item" key={page}>
      <Link to={`/products/page=${page}`}  onClick={() => handlePageChange(page)} className={page === currentPage ? 'current-page' : 'pagination-link'}> 
           {page} 
      </Link>
    </li>
     ))}
    <li className="page-item">
      <Link className="page-link" to={`/products/page=${currentPage + 1}`}  onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
      </Link>
    </li>
  </ul>
</nav>



          
        </div>
      );
    };
    
