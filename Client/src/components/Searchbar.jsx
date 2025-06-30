import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCountdownTimer } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { productsSliceAction } from "../store/productsSlice";
const Searchbar = () => {
  const navigate = useNavigate();
  const userQuery = useRef();
  const { searchQuery } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  const HandleSearch = async (e) => {
    e.preventDefault();
    const userQueryValue = userQuery.current.value;
    dispatch(productsSliceAction.searchQuery(userQueryValue));
    dispatch(productsSliceAction.activateNewSearch(true));
    dispatch(productsSliceAction.setCurrentPage(1));
    userQuery.current.value = "";
    navigate("/Products");
  };

  const HandleQueriesButton = async (text) => {
    userQuery.current.value = text;
    userQuery.current.focus();
  };
  return (
    <>
      <div className="overallContainer">
        <form className="row" onSubmit={HandleSearch}>
          <div className="col-1 searchbuttoncontainer">
            <button type="submit" className="btn btn-primary searchbutton ">
              <FiSearch color="black" />
            </button>
          </div>
          <div className="col-9 searchbarcontainer">
            <input
              type="text"
              ref={userQuery}
              className="form-control searchbarinput"
              id="inputPassword2"
              placeholder=" Type your query"
            />
          </div>
        </form>
        <h3 style={{ marginTop: "10px" }}>Powerful Search Engine</h3>
        <div>
          It handles both structured and unstructured queries. Some examples are
          given below :-
        </div>
        <br />
        <h4>Structured Queries: </h4>
        <div>
          <button
            class="badge text-bg-info queries"
            onClick={() => HandleQueriesButton("Hp Laptop under Rs50000")}
          >
            Hp Laptop under Rs50000
          </button>
          <button
            class="badge text-bg-info queries"
            onClick={() => HandleQueriesButton("Red Tshirt")}
          >
            Red Tshirt
          </button>
          <button
            class="badge text-bg-info queries"
            onClick={() =>
              HandleQueriesButton("Shoes under Rs3000 of red color")
            }
          >
            Shoes under Rs3000 of red color
          </button>
        </div>
        <br />
        <h4>Unstructured Queries: </h4>
        <div>
          <button
            class="badge text-bg-info queries"
            onClick={() =>
              HandleQueriesButton("I want a gift For my dad's birthday")
            }
          >
            I want a gift For my dad's birthday
          </button>
          <button
            class="badge text-bg-info queries"
            onClick={() =>
              HandleQueriesButton("I am going for jogging tommorow")
            }
          >
            I am going for jogging tommorow
          </button>
          <button
            class="badge text-bg-info queries"
            onClick={() => HandleQueriesButton("Today is raining")}
          >
            Today is raining
          </button>
        </div>
      </div>
    </>
  );
};
export default Searchbar;
