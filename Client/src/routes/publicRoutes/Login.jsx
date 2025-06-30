import { Link, useNavigate } from "react-router";
import { useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const Login = () => {
  // console.log("allenv", import.meta.env);
  const userEmail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate();
  const HandleLogin = async (e) => {
    e.preventDefault();
    const obj = {
      email: userEmail.current.value,
      password: userPassword.current.value,
    };
    try {
      // console.log("loginurl:", import.meta.env.VITE_LOGIN_URL);
      const res = await axios.post(import.meta.env.VITE_LOGIN_URL, obj);
      alert("Successfully Logged in");
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.log("Login Failed", err);
      console.log(err.response.data.err);
      alert(err.response.data.err);
    }
  };
  return (
    <div className="signincontainer">
      <form onSubmit={HandleLogin}>
        <center style={{ marginBottom: "10px" }}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <BsSearch size={80} style={{ color: "#97a9f0" }} />
            <span
              style={{
                position: "absolute",
                top: "8px",
                left: "17px",
                fontSize: "30px",
                pointerEvents: "none",
              }}
            >
              💡
            </span>
          </div>
          <h1>IntentShop</h1>
          <h4>E-commerce wih Intent</h4>
          <div style={{ fontWeight: "normal" }}>
            Our platform offers a smart search bar that understands users's
            shopping intent, wheather the query is structured or vague.
          </div>
        </center>
        <div className="form-floating">
          {" "}
          <input
            type="email"
            ref={userEmail}
            className="form-control loginelements"
            id="floatingInput"
            placeholder="name@example.com"
          />{" "}
          <label htmlFor="floatingInput">Email address</label>{" "}
        </div>{" "}
        <div className="form-floating">
          {" "}
          <input
            type="password"
            ref={userPassword}
            className="form-control loginelements"
            id="floatingPassword"
            placeholder="Password"
          />{" "}
          <label htmlFor="floatingPassword">Password</label>{" "}
        </div>{" "}
        <button
          className="btn btn-primary w-100 py-2 loginelements"
          type="submit"
        >
          Sign in
        </button>{" "}
      </form>
      <div className="loginelements">
        <Link to="/signup" className="loginelements">
          Dont have an Account? Register Here
        </Link>
      </div>
    </div>
  );
};
export default Login;
