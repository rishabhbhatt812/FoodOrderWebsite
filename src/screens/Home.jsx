import React, {useEffect ,useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {

  

  const [search , setsearch] = useState(" ");
  
 const[foodCat , setfoodCat] =  useState([]);
 const[foodItem , setfoodItem] =  useState([]);


   const loadData = async()=>{
    let response = await fetch("http://localhost:5000/api/foodData",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
      });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
   }
    
   useEffect(()=>{
    loadData();
   },[])
    

  return (
    <div >
      <div> <Navbar  /></div>
      <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousal" style={{ objectFit:"contain !important"}}>
      <div className="carousel-inner" id='carousal'>
        <div className='carousel-caption ' style={{zIndex:"10"}}>
          <div className="d-flex justify-content-center ">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
          </div>
        </div>
        <div className="carousel-item active align-items-center " >
          <img src="images/cake.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)"  }} alt='...' />
        </div>
        <div className="carousel-item" >
          <img src="images/pizza.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt='...' />
        </div>
        <div className="carousel-item" >
          <img src="images/Yogurt.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt='...' />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
     <div className=" container m-3 ">
       {
        (foodCat) !== ([]) ? foodCat.map((data)=>{
          return(<div className="row mb-3">
           <div key={data._id} className="fs-3 m-3 text-black">{data.CategoryName }</div>
           < hr style={{backgroundColor:"black"}}/>
           {(foodItem) !== ([]) ?foodItem.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))). map(filterItems=>{
              return(
                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 ">
                  <Card foodItem ={filterItems} options={filterItems.options[0]} />
                  </div>
              )
            }) : <div><h1>No such Data Found</h1></div>
           }
           </div>
          )
        }):" "
       }
    </div>
      <div>  <Footer /> </div>
    </div>
  );
}
