import React, { useContext } from 'react'
import { CartContext } from '../context/Cart'
import { useQuery } from 'react-query';
import axios from 'axios';
import Loeader from '../loader/Loeader';

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
  return <Loeader></Loeader>
}
  return (
    <>
     <div className="table-container">
        <table className='m-4'>
           {data?.orders?(data?.orders.map((ele, index)=>
               <>
            <thead className='m-4'>
              <h4 className='m-4 order'>Order {index}</h4> 
                <tr>
                    {/* <th>Order number</th> */}
                    <th>Address</th>
                     <th>Phone number</th>
                    <th>Final Price</th>
                    <th>Payment Type</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
       
               
               <tr className=''>
                    {/* <td>{index}</td> */}
                    <td>{ele.address}</td>
                     <td>{ele.phoneNumber}</td>
                    <td>{ele.finalPrice}</td>
                    <td>{ele.paymentType}</td>
                    <td>{ele.status}</td>
                   
                  </tr> 
                 
               
            </tbody>
            </>  
                )): <h2>There is no orders</h2>}
        </table>
    </div>
  
              
               
             
    
    </>
  )
}
