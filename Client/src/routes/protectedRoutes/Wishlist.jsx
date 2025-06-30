import Product from "../../components/product";
import { useDispatch, useSelector } from "react-redux";
import { wishlistSliceAction } from "../../store/wislistSlice";
import { useEffect } from "react";
import axios from "axios";
const Wishlist = () => {
  const wishlistproduct = useSelector((store) => store.wishlist);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductsFromDb = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(import.meta.env.VITE_WISHLIST_URL, {
          headers: {
            Authorization: token,
          },
        });

        dispatch(wishlistSliceAction.setWishlistFromDb(response.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductsFromDb();
  }, []);

  return (
    <>
      <div className="row" style={{ marginTop: "20px" }}>
        {wishlistproduct.map((product) => {
          return <Product Data={product}></Product>;
        })}
      </div>
    </>
  );
};
export default Wishlist;
