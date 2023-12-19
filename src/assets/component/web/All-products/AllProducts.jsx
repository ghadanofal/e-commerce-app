import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import './allProduct.css'
import { Link } from 'react-router-dom';
import { IoHeart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";


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
        console.log(data.products);
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
        <div className='container mt-5'>
        






<div className="row">
  <div className="col-md-12">
    <h2 className="mb-4 text-center ">Our Products</h2>
  </div>
{products.map((ele, index) => (
  <>
  
  <div className="col-md-3">
    <div className="product-card ">
      <div className="product-card-img">
        <label className="stock bg-success mt-3">{ele.stock} in Stock</label>
        <img src={ele.mainImage.secure_url} alt="Laptop" />
      </div>
      <div className="product-card-body">
        <h5 className="product-name">{ele.name}</h5>
       

        <div className="comment">
    {Array.from({ length: Math.floor(ele.ratingNumbers) }).map((ele) => (
        <span className='checked fs-4'>&#9733;</span>
        ))}
        {Array.from({ length: 5- Math.floor( ele.ratingNumbers) }).map((ele) => (
        <span className='non-checked fs-4'>&#9733;</span>
        ))}
        </div>

        <div>
          <span className="selling-price">{ele.finalPrice}$</span>
          <span className="original-price text-danger">{ele.price}$</span>
        </div>
        <div className="mt-2 text-center">
          <Link  className="btn btn1 btn-success rounded-3 text-white me-2">Add To Cart</Link>
          <Link to={`/product/${ele._id}`} className="btn btn1 rounded-3  me-4"> View </Link>
          <Link  className="btn btn1 border-0"> <IoHeart className='text-danger fs-4' /></Link>
        </div>
      </div>
    </div>
  </div>
 
  </>
            ))}
</div>


           
           













          <nav aria-label="Page navigation example  ">
  <ul className="pagination Page d-flex justify-content-center">
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
    
