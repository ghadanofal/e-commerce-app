import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import './allProduct.css'
import { Link } from 'react-router-dom';
import { IoHeart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { CartContext } from '../context/Cart';
import Loeader from '../loader/Loeader';


export default function AllProducts() {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotalPages] = useState(1);
    const [pages, setPages] = useState(1)
    const [sortOrder, setSortOrder] = useState('name');
    const [filterText, setFilterText] = useState('');
    const limit = 3;

let [loading, setLoading] = useState(true)






    const {addToCartContext} = useContext(CartContext)
    const addToCart = async (productId)=>{
      const res = await addToCartContext(productId)
      setLoading(false)
      console.log(res)
    }
  
    
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
     setLoading(false)
      return data
    }
    
    const ascendingEvent = () => {
      let data = [...products];
      if (data.length > 0) {
        let result = data.sort((a, b) => parseFloat(a.finalPrice) - parseFloat(b.finalPrice));
        setProducts(result);
      }
    };

    const descendingEvent = () => {
      let data = [...products];
      if (data.length > 0) {
        let result = data.sort((a, b) => parseFloat(b.finalPrice) - parseFloat(a.finalPrice));
        setProducts(result);
      }
    };

    const ascendingNameEvent = () => {
      let data = [...products];
      if (data.length > 0) {
        console.log('Before Sorting:', data.map(item => item.name));
        let result = data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        console.log('After Sorting:', result.map(item => item.name));
        setProducts(result);
       
      }
    };
    
    const descendingNameEvent = () => {
      let data = [...products];
      if (data.length > 0) {
        console.log('Before Sorting:', data.map(item => item.name));
        let result = data.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        console.log('After Sorting:', result.map(item => item.name));
        setProducts(result);
      }
    };

    const handleFilter = (productName) => {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(productName.toLowerCase())
      );
      setProducts(filteredProducts);
    };
  
   
    const handleFilterChange = (event) => {
      const newText = event.target.value;
      setFilterText(newText);
      if (newText === '') {
        getAllProduct(currentPage);
      } else {
        handleFilter(newText);
      }
    };
  





    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= pages) {
        setCurrentPage(newPage);
      }}
    
    useEffect(()=>{
        getAllProduct(currentPage, limit)
    },[currentPage, limit])

    if(loading){
      return <Loeader></Loeader>
      }


    return (
        <div className='container mt-5'>
<div className="row">
  <div className="col-md-12">
    <h2 className="mb-4 text-center ">Our Products</h2>
  </div>



  <div className="col-md-4">
          <label className="form-label">Filter by Name:</label>
          <input
            type="text"
            className="form-control"
            value={filterText}
            onChange={handleFilterChange} />
</div>

{/* sort */}
<div className="dropdown m-3 ">
  <button className="dropbtn rounded-3 ">Sort by</button>
  <div className="dropdown-content">
    <a href="#" onClick={ascendingEvent}>hight to low price</a>
    <a href="#" onClick={descendingEvent}>hight to low price</a>
    <a href="#" onClick={ascendingNameEvent}>ascending name</a>
    <a href="#" onClick={descendingNameEvent}>descending name</a>
    
  </div>
</div>






{products.map((ele, index) => (
  <>
  
  <div className="col-md-3">
    <div className="product-card ">
      <div className="product-card-img">
        <label className="stock  mt-3">{ele.stock} in Stock</label>
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
          <Link  className="btn btn1 add-to-cart rounded-3 text-white me-2" onClick={()=>addToCart(ele._id)}>Add To Cart</Link>
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
    
