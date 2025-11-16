import express from "express";

const app = express();
app.use(express.json());

// "DB" זמני בזיכרון
let orders = {};

// יצירת / עדכון הזמנה
app.post("/api/hotelplus/order", (req, res) => {
  const data = req.body;

  if (!data.orderId) {
    return res.status(400).json({ error: "Missing orderId" });
  }

  orders[data.orderId] = data;
  return res.json({ success: true, order: data });
});

// שליפת הזמנה לפי ID
app.get("/api/hotelplus/order/:id", (req, res) => {
  const id = req.params.id;
  const order = orders[id];

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  return res.json(order);
});

// שליפת כל ההזמנות
app.get("/api/hotelplus/orders", (req, res) => {
  return res.json(Object.values(orders));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HotelPlus external API running on port ${PORT}`);
});
