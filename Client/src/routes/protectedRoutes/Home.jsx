import { useEffect, useState, useRef } from "react";
import Product from "../../components/product";
import { Link } from "react-router";
import axios from "axios";
import LoadingState from "../../components/LoadingState";
import { useDispatch, useSelector } from "react-redux";
import { productsSliceAction } from "../../store/productsSlice";

const HomeContent = () => {
  const dispatch = useDispatch();
  const [Products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { feturedProducts } = useSelector((store) => store.products);
  const featuredProducts = async () => {
    if (feturedProducts.length > 0) {
      setProducts(feturedProducts);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_HOME_URL);
      dispatch(
        productsSliceAction.addtofeturedProducts(response.data.feturedProducts)
      );
      setProducts(response.data.feturedProducts);
      setLoading(false);
    } catch (err) {
      setProducts([]);
      console.log(err);
    }
  };
  useEffect(() => {
    featuredProducts();
  }, []);

  return (
    <>
      <div className=" homecontent">
        {" "}
        <div className="homebox hometext">
          <h1 className="display-5 fw-bold text-body-emphasis">
            Welcome To Our Store
          </h1>{" "}
          <h5>Your one stop shoping destination</h5>
          <button type="button" className="btn btn-danger btn-lg px-4  ">
            <Link
              to="/Products"
              style={{ textDecoration: "none", color: "white" }}
            >
              Shop New
            </Link>
          </button>{" "}
        </div>
        <div className="homebox homeimage"></div>
      </div>
      {Loading ? <LoadingState></LoadingState> : ""}
      <div className="featureproductscontainer">
        <h3
          style={{
            marginLeft: "30px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          Featured Products
        </h3>
        <div className="row">
          {Products.map((product) => {
            return <Product key={product.productId} Data={product}></Product>;
          })}
        </div>
      </div>
    </>
  );
};
export default HomeContent;
