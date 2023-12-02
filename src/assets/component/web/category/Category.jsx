import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';


export default function Category() {

    // console.log(import.meta.env.VITE_API_URL);

    
    const getCategories = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        return data
        // console.log(data);
    };

    const { data, isLoading } = useQuery('web_categories', getCategories);
    // console.log(query)
    console.log(data?.categories);

    if (isLoading) {
        return <h2>...loading</h2>
    }

    return (

        <div className='row'>
            {data?.categories.length ? data?.categories.map((ele) => 
            <div className='col-lg-3' key={ele._id}>
                <div>{ele.name}</div>
                <img src={ele.image.secure_url} />
            </div>


            ):<h2>data not found</h2>}

        </div>
    )
}
