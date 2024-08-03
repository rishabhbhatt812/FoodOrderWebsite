import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyOrder() {

  const [orderData, setorderData] = useState("");

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('userEmail'))
    await fetch("http://localhost:5000/api/myorderdata", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    }).then(async (resp) => {
      let response = await resp.json()
      await setorderData(response)
    })
  }

  useEffect(() => {
    fetchMyOrder()
  }, [])

  return (
    <>
      <div><Navbar /></div>
      <div>
        <section className="vh-100" style={{ backgroundColor: "#fdccbc" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col " >
                <p><span className="h2"> Order History </span></p>
                <div className="card mb-3 ">
                                    <div className="card-body p-4 ">
                <div className='row align-items-center '>
                                      <div className='col-md-2  d-flex justify-content-center '>
                                       <p className="small text-muted mb-4 pb-2">Date</p></div>
                                        <div className='col-md-2  d-flex justify-content-center '>
                                          <p className="small text-muted mb-4 pb-2">Name</p></div>
                                        <div className='col-md-2  d-flex justify-content-center '>
                                          <p className="small text-muted mb-4 pb-2">Size</p></div>
                                        <div className='col-md-2  d-flex justify-content-center '>
                                          <p className="small text-muted mb-4 pb-2">Quantity</p></div>
                                        <div className='col-md-2  d-flex justify-content-center '>
                                          <p className="small text-muted mb-4 pb-2">Price</p></div>
                                      </div>
                {(orderData) !== ([]) ? Array(orderData).map(data => {
                  return (
                    data.orderData  ?
                      data.orderData.order_data.slice(0).reverse().map((item) => {
                        return (
                          item.map((arrayData) => {
                            return (
                              <div >
                                      <div className="row align-items-center">
                                      <div className="col-md-2 d-flex justify-content-center">
                                          <div>
                                            <p className="small text-muted mb-4 pb-2">{data.orderData.order_date}</p>
                                          </div>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-center">
                                          <div>
                                            <p className="small text-muted mb-4 pb-2">{arrayData.name}</p>
                                          </div>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-center">
                                          <div>
                                            <p className="small text-muted mb-4 pb-2">
                                              {arrayData.size}</p>
                                          </div>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-center">
                                          <div>
                                            <p className="small text-muted mb-4 pb-2">{arrayData.qty}</p>
                                          </div>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-center">
                                          <div>
                                            <p className="small text-muted mb-4 pb-2">₹{arrayData.price}</p>
                                          </div>
                                        </div>
                                        
                                      </div>
                              </div>
                            )
                          })
                        )
                      }) : "")
                }) : ""}
              </div>
              </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div><Footer /></div>
    </>
  )
}
