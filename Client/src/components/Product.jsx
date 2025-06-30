import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceAction } from "../store/cartSlice";
import { wishlistSliceAction } from "../store/wislistSlice";
import axios from "axios";
const Product = ({ Data }) => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const wishlist = useSelector((store) => store.wishlist);
  const productFoundFromCart = cart.some((item) => {
    return item.productId === Data.productId;
  });
  const productFoundFromWishlist = wishlist.some((item) => {
    return item.productId === Data.productId;
  });
  const HandleAddtoCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const productId = Data.productId;
      console.log(Data);
      const response = await axios.post(
        import.meta.env.VITE_CART_URL,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(cartSliceAction.addtocart(response.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  const HandleRemoveFromCart = async () => {
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
  const HandleAddtoWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const productId = Data.productId;
      const response = await axios.post(
        import.meta.env.VITE_WISHLIST_URL,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // dispatch(cartSliceAction.addtocart(response.data.data));
      dispatch(wishlistSliceAction.addtowishlist(response.data.data));
    } catch (err) {
      console.log(err);
    }

    //  dispatch(wishlistSliceAction.addtowishlist(Data.id));
  };
  const HandleRemoveFromWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/wishlist/${Data.productId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // dispatch(cartSliceAction.removefromcart(response.data.data));
      dispatch(wishlistSliceAction.removefromwislist(response.data.data));
    } catch (err) {
      console.log(err);
    }
    // dispatch(wishlistSliceAction.removefromwislist(Data.id));
  };
  return (
    <div className="card col-3 productcontainer">
      <img src={Data.image_Url} className="card-img-top" alt="..." />
      <div className="rating">
        {Data.rating} ⭐ | {25}
      </div>
      <h3 className="card-title">{Data.company_name}</h3>
      <h5 className="card-text">{Data.item_name}</h5>
      <span class="card-category">{Data.category}</span>
      <div className="price">
        <span className="current-price" style={{ fontWeight: "bold" }}>
          Rs {Math.floor(Data.current_price)}
        </span>
        <span
          className="original-price"
          style={{ textDecoration: "line-through", margin: "10px" }}
        >
          Rs {Math.floor(Data.original_price)}
        </span>
        <span className="discount" style={{ color: "red" }}>
          ({Data.discount_percentage}% OFF)
        </span>
      </div>
      {!productFoundFromCart ? (
        <button className="btn btn-primary addToCart" onClick={HandleAddtoCart}>
          Add to Cart
        </button>
      ) : (
        <button
          className="btn btn-danger addToCart"
          onClick={HandleRemoveFromCart}
        >
          Remove From Cart
        </button>
      )}
      {!productFoundFromWishlist ? (
        <button className="addToWishList" onClick={HandleAddtoWishlist}>
          <FaRegHeart size={30} />
        </button>
      ) : (
        <button className="addToWishList" onClick={HandleRemoveFromWishlist}>
          <FaHeart size={30} style={{ color: "red" }} />
        </button>
      )}
    </div>
  );
};
export default Product;
