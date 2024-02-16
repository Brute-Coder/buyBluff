import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


export default function Signup() {
  let navigate = useNavigate()
  // State for user input
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const response = await fetch("http://localhost:4000/api/createuser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:userData.name,
        email:userData.email,
        password:userData.password,
        location:userData.location
      })
    });
    const json  = await response.json()
   // console.log(json);
    if(!json.success){
      if(json.existError){
      alert(json.errors)
      navigate("/login")
    }
      else 
      alert(json.errors[0].msg);
    }
    else navigate("/login")
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="card-header">
              <h2 className="text-center">Sign Up</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      required
                    />

                  </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      name="location"
                      value={userData.location}
                      onChange={handleInputChange}
                      required
                    />
                  
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary" style={{background:"#00bc8c"}} >
                    Sign Up
                  </button>
                   
                   <Link to="/login" style={{marginLeft: '30px '}} >
                   <button type="button" className="btn btn-secondary ms-2 " style={{ background:"#e74c3c" }}>
                    Log In
                    </button>
                  </Link>
                  </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



