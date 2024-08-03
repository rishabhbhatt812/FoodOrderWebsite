import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { CartDispatchContext , CartStateContext } from "../App";

export default function Card({  options, foodItem}) {
  let data = useContext(CartStateContext)
  const priceRef = useRef();
  let dispatch = useContext(CartDispatchContext)
  let foodOptions = options;
  let priceOptions = Object.keys(foodOptions);



  const [qty, setqty] = useState(1);
  const [size, setsize ] = useState("");

  let food = []
  const handleAddToCart = async() => {
    if((localStorage.getItem("authToken"))){
    for(const item of data){
      if(item.id === foodItem._id){
      food = item ;
      
      break;
    }
  }
    if((food) !== ([])){
       if(food.size === size){
        await dispatch({type:"UPDATE", id:foodItem._id , price:finalPrice, qty:qty})
       
        return
       }
       else if(food.size !== size){
      await  dispatch({type:"ADD",
          id:foodItem._id , name:foodItem.name , price:price , qty: qty , size :size , img:foodItem.img , finalPrice:finalPrice
         }) 
         return
       }
        
          return
        
      }
       await  dispatch({type:"ADD",
        id:foodItem._id , name:foodItem.name , price:price , qty: qty , size :size , img:foodItem.img , finalPrice:finalPrice
       })
      }else{
        alert("Please login to add item to cart");
      }
  }
   
  const ItemPresent = data.find(item=> item.name === foodItem.name);
 

  const index = data.findIndex(item => item.name === foodItem.name)


  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
   setsize(priceRef.current.value)
  },[])

  let price = parseInt(options[size]) ;

  return (
    <div >
      <div>
        <div
          className="card mt-3 "
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={foodItem.img}
            className="card-img-top  rounded-1"
            alt="..."
            style={{ height: "150px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title text-black">{foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100  bg-success rounded " onChange={(e)=>setqty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div
                className="d-inline h-100 fs-5 mx-2 "
                style={{ color: "blue" }}
              >
               ₹{finalPrice}/-
              </div>
              <hr style={{backgroundColor:"black"}} />
              <div class="d-grid  mx-auto">
                {(ItemPresent)? ( <button class="btn btn-danger " type="button"  onClick={()=>{dispatch({type:"REMOVE",index:index })}} >Remove From Cart   </button>):(
                <button class="btn btn-success " type="button" onClick={handleAddToCart} >Add to Cart   </button>)
                 }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
