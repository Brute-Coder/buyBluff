import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

export default function Home() {
  const [itemCat, setItemCat] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [searchData,setSearchData] = useState("")

  const handleFormSubmit = (formData) => {
    // You can access the form data here and do something with it
   // console.log('Form data:', formData);
    setSearchData(formData)
};

  const loaddata = async () => {
    let response = await fetch('http://localhost:4000/api/cartdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    response = await response.json();
    setCartItem(response[0]);
    setItemCat(response[1]);
   // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <Carousel onFormSubmit={handleFormSubmit} />

      </div>
      <div className="container">
        {itemCat.length > 0
          ? itemCat.map((data) => {
              return (
                <div key={data._id} className="row mb-3">
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {cartItem.length > 0
                    ? cartItem
                        .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(searchData.toLowerCase())))
                        .map((filteredItem) => {
                          return (
                            <div
                              key={filteredItem._id} // Added key prop
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <Card itemName = {filteredItem}
                              options={filteredItem.options[0]}
                              imgSrc = {filteredItem.img}></Card>
                            </div>
                          );
                        })
                    : 'no data found '}
                </div>
              );
            })
          : ''}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
