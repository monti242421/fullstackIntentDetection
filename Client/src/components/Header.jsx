import { IoCartOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  const token = localStorage.getItem("token");
  const username = parseJwt(token).username;

  const cartProducts = useSelector((store) => store.cart);
  const wishlistProducts = useSelector((store) => store.wishlist);

  const [showLogout, setshowLogout] = useState(false);
  return (
    <header className="topheader">
      <div className="headergrid">
        <div className="logo">
          <NavLink
            to="/"
            className={({ isActive }) => {
              isActive ? "nav-link active-tab" : "nav-link";
            }}
          >
            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginLeft: "10px",
                marginTop: "20px",
              }}
            >
              <BsSearch size={40} style={{ color: "#97a9f0" }} />
              <span
                style={{
                  position: "absolute",
                  top: "7px",
                  left: "9px",
                  fontSize: "14px",
                  pointerEvents: "none",
                }}
              >
                💡
              </span>
              <span
                style={{
                  position: "absolute",
                  fontSize: "40px",
                  fontWeight: "bold",
                  top: "-13px",
                  marginLeft: "10px",
                  color: "black",
                }}
              >
                IntentShop
              </span>
            </div>
          </NavLink>
        </div>
        <div className="Navlinks">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navlink activetab hometab" : "navlink hometab"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/Products"
            className={({ isActive }) =>
              isActive ? "navlink activetab" : "navlink"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/Orders"
            className={({ isActive }) =>
              isActive ? "navlink activetab" : "navlink"
            }
          >
            Orders
          </NavLink>
        </div>
        <div className="NavlinksIcons">
          <NavLink
            to="/Cart"
            className={({ isActive }) =>
              isActive ? "navlinkicon activetabicon" : "navlinkicon"
            }
          >
            <div className="position-relative">
              <IoCartOutline size={30}></IoCartOutline>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {cartProducts.length}
              </span>
            </div>
          </NavLink>
          <NavLink
            to="/Wishlist"
            className={({ isActive }) =>
              isActive ? "navlinkicon activetabicon" : "navlinkicon"
            }
          >
            <div
              className="position-relative"
              style={{
                color: "red",
              }}
            >
              <FaHeart size={30} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {wishlistProducts.length}
              </span>
            </div>
          </NavLink>
          <div
            className="position-relative userButton"
            style={{
              display: "inline-block",
              marginLeft: "20px",
            }}
          >
            <button
              style={{ background: "none", border: "none" }}
              onClick={() => {
                if (showLogout) {
                  setshowLogout(false);
                } else {
                  setshowLogout(true);
                }
              }}
            >
              <FaUserLarge size={40} />
              <span className="position-absolute top-20 start-100 translate-middle badge rounded-pill bg-danger">
                {username}
              </span>
            </button>
            <button
              className="logoutButton"
              hidden={showLogout ? "" : "hidden"}
              onClick={HandleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
