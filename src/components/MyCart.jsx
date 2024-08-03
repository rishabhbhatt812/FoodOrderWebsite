import React, { useContext} from 'react'
import Navbar from './Navbar'
import { CartDispatchContext, CartStateContext } from '../App'
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import Footer from './Footer';


export default function MyCart() {

   

  const data = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);


  const handleCheckOut = async()=>{
    let userEmail = localStorage.getItem('userEmail');
    console.log(userEmail);
    let response = await fetch("http://localhost:5000/api/orderData",
      {
        method:"POST",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify({
          order_data:data,
          email:userEmail,
          order_date:new Date()
        })
      }
    );
    console.log("Order Response:",response);
    if(response.status === 200){
      dispatch({type:"DROP"})
      alert("Order Placed Successfully");
    }
  }


  const totalPrice = data.reduce((total , food)=> total + food.finalPrice, 0);


  return (
    <div> 
      <div><Navbar/></div>
   
     <div>  
      <section className="vh-100" style={{backgroundColor: "#fdccbc"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <p><span className="h2">Shopping Cart </span></p>

        <div className="card mb-4">
          <div className="card-body p-4 ">
            
            <div className='row align-items-center '>
              <div className='col-md-1  d-flex justify-content-center '> 
                <p className="small text-muted mb-4 pb-2">Items</p></div>
              <div className='col-md-2  d-flex justify-content-center '>
                <p className="small text-muted mb-4 pb-2">Name</p></div>
              <div className='col-md-2  d-flex justify-content-center '>
                 <p className="small text-muted mb-4 pb-2">Size</p></div>
              <div className='col-md-2  d-flex justify-content-center '>
                <p className="small text-muted mb-4 pb-2">Quantity</p></div>
              <div className='col-md-2  d-flex justify-content-center '>
                 <p className="small text-muted mb-4 pb-2">Price</p></div>
              <div className='col-md-2  d-flex justify-content-center '>
                <p className="small text-muted mb-4 pb-2">Total </p></div>
            </div>
            
          { ((data.length) !== 0) ? data.map((food,index)=> {
             return(  
            <div className="row align-items-center">
              <div className="col-md-1 d-flex justify-content-center ">
              <div>
                  <p className="small text-muted mb-4 pb-2">{index +1}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
              <div>
                  
                  <p className="small text-muted mb-4 pb-2">{food.name}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  
                  <p className="small text-muted mb-4 pb-2">
                    {food.size}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  
                  <p className="small text-muted mb-4 pb-2">{food.qty}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  
                  <p className="small text-muted mb-4 pb-2">₹{food.price}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                 
                  <p className="small text-muted mb-4 pb-2">₹{food.finalPrice}</p>
                </div>
              </div>
              <div className="col-md-1 d-flex justify-content-center">
                <div>
                 <button type='button' className='btn small text-muted mb-4  rounded-3' style={{backgroundColor:"red" , width:"70px" , height:"35px"}}  onClick={()=>{dispatch({type:"REMOVE",index:index })}
                }><FaTrash /></button>
                </div>
              </div>
            </div> ) } ) : (
            <div className='d-flex justify-content-center align-items-center' >
            <span className='small text-muted mb-1 pb-2 fs-4 '>Cart is empty</span>
      </div>    
      )
    } 
          </div>
        </div>

        <div className="card mb-5">
          <div className="card-body p-4">

            <div className="float-end">
            { ((data.length) === 0)? ( <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Order total:</span> <span
                  className="lead text-muted fw-normal">₹0</span>
              </p>):(
            <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Order total:</span> <span
                  className="lead text-muted fw-normal">₹{totalPrice}</span>
              </p>
              )}  
            </div>

          </div>
        </div>

        <div className="d-flex justify-content-end">
          <Link to='/'  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg me-2">Continue shopping</Link>
          <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" onClick={handleCheckOut}>Place Order</button>
        </div>

      </div>
    </div>
  </div>
</section>
      </div> 
      <div><Footer/></div>
    </div>

    
  )
}
