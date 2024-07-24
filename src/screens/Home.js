import React, { useEffect, useState } from 'react'
import Navbar from '../componenets/Navbar'
import Footer from '../componenets/Footer'
import Card from '../componenets/Card'
import Burger from "./freshest-burgers-in-brooklyn.webp"
import Pastry from "./pastry.jpg"
import Barbeque from "./barbeque.jpg"
import ErrorComponent from '../componenets/ErrorComponent';


export default function Home() {
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      let response = await fetch("/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to fetch data from API');
      }
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src={Burger} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={Pastry} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={Barbeque} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
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
      <div className='container'>
        {error ? (
          <ErrorComponent message={error} /> // Display error message
        ) : (
          foodCat.length > 0
            ? foodCat.map((data) => (
              <div key={data._id} className='row mb-3'>
                <div className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length > 0
                  ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodItem={filterItems}
                          options={filterItems.options[0]}
                          imgSrc={filterItems.img} />
                      </div>
                    ))
                  : <div>No data</div>}
              </div>
            ))
            : ""
        )}
      </div>
      <Footer />
    </div>
  );
}
