import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';
import './category.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';


export default function Category() {

    // console.log(import.meta.env.VITE_API_URL);

    
    const getCategories = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=9`);
        return data
        // console.log(data);
    };

    const { data, isLoading } = useQuery('web_categories', getCategories);
    // console.log(query)
    // console.log(data?.categories);

    if (isLoading) {
        return <h2>...loading</h2>
    }

    return (
    <div className='container mt-5 swipee'>
    <div className='swiper-pagination mb-5 '></div>
        <Swiper
        
       modules={[Navigation, Pagination, Autoplay]}
       spaceBetween={1}
       slidesPerView={5}
       loop= {true}
        autoplay={ {
        delay: 1000,
      }}
       
       navigation
       
       pagination={{ clickable: true
    }}
    
       onSwiper={(swiper) => console.log(swiper)}
       onSlideChange={() => console.log('slide change')}
    >

        {data?.categories.length ? data?.categories.map((ele,index)=>
           
            <SwiperSlide key={ele._id} className='py-5' >
                 <Link to={`/products/category/${ele._id}`}>
                <img src={ele.image.secure_url} className='image'/>   
           </Link> 
           </SwiperSlide>
            
        ):'data not found'}
    </Swiper>
    </div>
 
   ) }    