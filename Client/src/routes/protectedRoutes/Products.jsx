import Product from "../../components/product";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import LoadingState from "../../components/LoadingState";
import { useOutletContext } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { productsSliceAction } from "../../store/productsSlice";
import Pagnition from "../../components/pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [filters, setfilters] = useState([]);
  const {
    Products,
    searchQuery,
    fetchNewSearchResults,
    Filters,
    currentPage,
    pageSize,
  } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  const selectPaginatedProducts = () => {
    const start = (currentPage - 1) * pageSize;
    return Products.slice(start, start + pageSize);
  };
  const selectTotalPages = Math.ceil(Products.length / pageSize);
  console.log(Products.length);

  const loadProducts = async () => {
    if (fetchNewSearchResults == false) {
      setfilters(Filters);
      return;
    }

    setLoading(true);
    try {
      if (searchQuery != null) {
        console.log(searchQuery);
        const res = await axios.post(import.meta.env.VITE_SEARCHPRODUCTS_URL, {
          userQuery: searchQuery,
        });
        console.log(res.data);
        dispatch(productsSliceAction.addtoProducts(res.data.product_list));
        dispatch(productsSliceAction.activateNewSearch(false));
        dispatch(productsSliceAction.addtoFilters(res.data.filters));
        setfilters(res.data.filters);
      } else {
        console.log("productsbar");
        const response = await axios.get(import.meta.env.VITE_PRODUCTS_URL);
        dispatch(productsSliceAction.addtoProducts(response.data.Products));
        dispatch(productsSliceAction.activateNewSearch(false));
      }
      setLoading(false);
    } catch (err) {
      setProducts([]);
      console.log(err);
    }
  };
  useEffect(() => {
    loadProducts();
  }, [fetchNewSearchResults]);

  if (Loading) return <LoadingState></LoadingState>;
  return (
    <>
      <div className="paginationtop">
        <Pagnition totalpages={selectTotalPages}></Pagnition>
      </div>

      <div className="productscontainer">
        {filters.length > 0 ? (
          <div className="filters">
            <span class="badge text-bg-dark">Tags : </span>
            <span class="badge text-bg-danger">
              {filters[0].product_type ? filters[0].product_type : null}
            </span>
            <span class="badge text-bg-danger">
              {filters[0].category ? filters[0].category : null}
            </span>
            <span class="badge text-bg-danger">
              {filters[0].brand ? filters[0].brand : null}
            </span>
            <span class="badge text-bg-danger">
              {filters[0].color ? `Color: ${filters[0].color}` : null}
            </span>
            <span class="badge text-bg-danger">
              {filters[0].budget ? `> Rs: ${filters[0].budget}` : null}
            </span>
          </div>
        ) : null}
        {/* <h3
          style={{
            marginLeft: "30px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          Handpicked For You
        </h3> */}
        <div className="row">
          {selectPaginatedProducts().map((product) => {
            return <Product key={product.productId} Data={product}></Product>;
          })}
          ;
        </div>
      </div>

      <div className="paginationbottum">
        <Pagnition totalpages={selectTotalPages}></Pagnition>
      </div>
    </>
  );
};
export default Products;
