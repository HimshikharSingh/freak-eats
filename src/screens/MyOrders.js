import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";  // Corrected the import path
import Navbar from "../components/Navbar";  // Corrected the import path

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(""); // Added error state

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setOrderData(data);  // Updated state setting
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Failed to load order data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>{error}</div>; // Display error message

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData.map((order, index) => (
              <div key={index}>
                {order.orderData ? (
                  order.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((orderItem, idx) => (
                      <React.Fragment key={idx}>
                        {orderItem.map((arrayData, index) => (
                          <div key={index}>
                            {arrayData.Order_date ? (
                              <div className="m-auto mt-5">
                                <strong>{arrayData.Order_date}</strong>
                                <hr />
                              </div>
                            ) : (
                              <div className="col-12 col-md-6 col-lg-3">
                                <div
                                  className="card mt-3"
                                  style={{
                                    width: "100%",
                                    maxHeight: "360px",
                                  }}
                                >
                                  {/* Uncomment and adjust as needed */}
                                  {/* <img
                                    src={arrayData.img}
                                    className="card-img-top"
                                    alt="..."
                                    style={{
                                      height: "120px",
                                      objectFit: "fill",
                                    }}
                                  /> */}
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      {arrayData.name}
                                    </h5>
                                    <div
                                      className="container w-100 p-0"
                                      style={{ height: "38px" }}
                                    >
                                      <span className="m-1">
                                        {arrayData.qty}
                                      </span>
                                      <span className="m-1">
                                        {arrayData.size}
                                      </span>
                                      <span className="m-1">
                                        {arrayData.Order_date || "N/A"}
                                      </span>
                                      <div className="d-inline ms-2 h-100 w-20 fs-5">
                                        ₹{arrayData.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </React.Fragment>
                    ))
                ) : (
                  <div>No orders found</div>
                )}
              </div>
            ))
          ) : (
            <div>No order data available</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
