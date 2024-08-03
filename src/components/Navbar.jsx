import React from 'react'
import { Link , useNavigate   } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import { useContext } from 'react';
import { CartStateContext } from '../App';




function Navbar({size}) {
  
  const data = useContext(CartStateContext);

   const navigate = useNavigate();


  const handleLogOut =()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

 

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid ">
    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-1 ">
        <li className="nav-item">
          <Link className="nav-link  fs-5 active" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken")) ? (<Link className="nav-link  fs-5 active" aria-current="page" to="/MyOrder">My Orders</Link>):" "}
      </ul>
     
        {(localStorage.getItem("authToken"))?(<div className='d-flex '>
          <Link to="/MyCart" className="btn btn-warning  text-white mx-1"  >My Cart {"  "}
          { ((data.length) !== 0 ) ?
            <Badge pill bg="danger">{data.length}</Badge>: " "
          }
          </Link>
         
          <button className="btn btn-danger text-white mx-1" onClick={handleLogOut} >Log Out</button>
          </div>):
        <div className='d-flex'>
        <Link className="btn bg-primary text-white mx-1" to="/login">Login</Link>
          <Link className="btn bg-primary text-white mx-1" to="/signup">Sign Up</Link>
      </div>
       }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar