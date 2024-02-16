import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/loginuser",{
      method:'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
      email:userData.email,
      password:userData.password
    })
     
  });

  const json = await response.json()
  //console.log(json)

  if(!json.success){
    alert(json.errors)
  }
  if(json.success) {
    localStorage.setItem("authToken",json.authToken)
   // console.log(localStorage.getItem("authToken"))
    navigate("/")}
    
  
  };
  return (

    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="card-header">
              <h2 className="text-center">Log In</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>

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
                <div className="text-center">

                <button type="submit" className="btn btn-secondary ms-2" style={{ background:"#00bc8c", marginRight: '30px '}}>
                    Log In
                  </button>

                  <Link to="/signup" >
                    <button type="button" className="btn btn-primary" style={{background:"#e74c3c"}} >
                      Sign Up
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
