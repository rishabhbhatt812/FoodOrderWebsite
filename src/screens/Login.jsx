import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

export default function Login(){
  const [details, setdetails] = useState({ email: "", password: "" })

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/Login", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      })
    });

    const json = await response.json();
    console.log(json);

    if (!json.message) {
      alert("Enter Valid Details");
    }
    
    if(json.message){
      localStorage.setItem("userEmail", details.email);
      localStorage.setItem("authToken", json.authToken);
      navigate('/');

    }
  }

  const onChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
         

          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className='from-lable'>Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={details.email} onChange={onChange} />

          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className='from-lable'>Password</label>
            <input type="password" className="form-control" placeholder="Password" name='password' value={details.password} onChange={onChange} />
          </div>

         

          <button type="submit" className=" m-3 btn btn-success">Login</button>
          <Link to="/Signup" className='m-3 btn btn-danger'>Create New Account</Link>
        </form>
      </div>

    </>
  )
}

