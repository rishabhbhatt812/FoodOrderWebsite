import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

  const [details, setdetails] = useState({ name: "", email: "", password: "", location: "" })
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( JSON.stringify({
      name: details.name,
      email: details.email,
      password: details.password,
      location: details.location
    }));
    const response = await fetch("http://localhost:5000/api/SignUp", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        password: details.password,
        location: details.location
      })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Details");
    }
   
    navigate('/login');
   

  }


 

  const onChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value })
  }
  return (

    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Username" className='from-lable'>Name</label>
            <input type="text" className="form-control" placeholder="Enter User name" name='name' value={details.name} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className='from-lable'>Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={details.email} onChange={onChange} />

          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className='from-lable'>Password</label>
            <input type="password" className="form-control" placeholder="Password" name='password' value={details.password} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className='from-lable'>Address</label>
            <input type="text" className="form-control"  placeholder="Address.." name='location' value={details.location} onChange={onChange} />
          </div>

          <button type="submit" className=" m-3 btn btn-primary " >Create</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already have a account</Link>
        </form>
      </div>
    </>
  )
}
