import React, { useContext } from 'react'
import { CartContext } from '../context/Cart'
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Orders() {
   
const {getOrder, orders,setOrder} = useContext(CartContext)
console.log(orders)
    const GetOrder = async () => {
      const res = await getOrder();
      // console.log(res);
      return res
      
  }

  const { data, isLoading } = useQuery('order', GetOrder);

  // console.log(data)
if(isLoading){
  return <h2>loading...</h2>
}
  return (
    <>
     <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>Order number</th>
                    <th>address</th>
                    <th>Final Price</th>

                    <th>Phone number</th>
                    <th>Payment Type</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
       
                {data?.orders.map((ele, index)=>
               <>
               <tr className=''>
                    <td>{index}</td>
                    <td>{ele.address}</td>
                    <td>{ele.finalPrice}</td>
                    <td>{ele.phoneNumber}</td>
                    <td>{ele.paymentType}</td>
                    <td>{ele.status}</td>
                   
                  </tr> 
                  </>  )}
               
               
            </tbody>
        </table>
    </div>
  
              
               
             
    
    </>
  )
}
