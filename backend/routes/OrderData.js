const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      res.json({ success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    console.log(req.body.email);
    let eId = await Order.findOne({ email: req.body.email });

    res.json({ orderData: eId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error");
  }
});


module.exports = router;
