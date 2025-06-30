import { useEffect } from "react";
import Order from "../../components/Order";
import axios from "axios";
import { useState } from "react";
const Orders = () => {
  const [yourOrders, setYourOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(import.meta.env.VITE_ORDER_URL, {
          headers: {
            Authorization: token,
          },
        });

        setYourOrders(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getOrders();
  }, []);
  return (
    <>
      <h3 style={{ margin: "20px" }}>Your Orders</h3>
      {yourOrders.map((order) => {
        return <Order key={order.orderId} Data={order}></Order>;
      })}
    </>
  );
};
export default Orders;
