import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cartSliceAction } from "../store/cartSlice";
import axios from "axios";
const CartItem = ({ Data }) => {
  const dispatch = useDispatch();
  const HandleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/${Data.productId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(cartSliceAction.removefromcart(response.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="cartitem">
      <img src={Data.image_Url} width="150px" height="200px" />
      <div className="cartitemdetails">
        <h5 className="card-title">{Data.company_name}</h5>
        <p className="card-text">{Data.item_name}</p>
        <div className="price">
          <span className="current-price" style={{ fontWeight: "bold" }}>
            Rs {Data.current_price}
          </span>
          <span
            className="original-price"
            style={{ textDecoration: "line-through", margin: "10px" }}
          >
            Rs {Data.original_price}
          </span>
          <span className="discount" style={{ color: "red" }}>
            ({Data.discount_percentage}% OFF)
          </span>
        </div>
        <div className="return-period">
          <span className="return-period-days" style={{ fontWeight: "bold" }}>
            {Data.return_period} days
          </span>{" "}
          return available
        </div>
        <div className="delivery-details">
          Delivery by
          <span className="delivery-details-days" style={{ color: "blue" }}>
            {Data.delivery_date}
          </span>
        </div>
      </div>

      <div className="deleteCartItem" onClick={HandleDelete}>
        <MdDelete size="40" />
      </div>
    </div>
  );
};
export default CartItem;
