import React from 'react'

export default function Carousal() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousal" style={{ objectFit:"contain !important"}}>
      <div className="carousel-inner" id='carousal'>
        <div className='carousel-caption ' style={{zIndex:"10"}}>
          <form className="d-flex ">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success text-white " type="submit">Search</button>
          </form>
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
    </div></div>
  )
}
