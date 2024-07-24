import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer"; // Fixed the import path

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
    );
  }

  const handleCheckOut = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      const response = await fetch("/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.ok) {
        dispatch({ type: "DROP" });
      } else {
        console.error("Failed to check out:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during checkout:", error);
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive">
        <table className="table table-hover">
          <thead className="text-warning fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index })}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: ₹{totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-warning mt-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
