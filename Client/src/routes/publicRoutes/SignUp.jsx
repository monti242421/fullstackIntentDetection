import { Link, useNavigate } from "react-router";
import { useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const SignUp = () => {
  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate();
  const HandleSignup = async (e) => {
    e.preventDefault();
    const obj = {
      name: userName.current.value,
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    try {
      const res = await axios.post(import.meta.env.VITE_SIGNUP_URL, obj);
      alert("Successfully Signed up");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response.data.err);
    }
  };
  return (
    <div className="signincontainer">
      <form onSubmit={HandleSignup}>
        {" "}
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
            type="text"
            className="form-control loginelements"
            ref={userName}
            id="floatingInput"
            placeholder="name@example.com"
          />{" "}
          <label htmlFor="floatingInput">Please Enter Your Name</label>{" "}
        </div>{" "}
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
          Register Me
        </button>{" "}
      </form>
      <div className="loginelements">
        <Link to="/login"> Already have an account? Login here</Link>
      </div>
    </div>
  );
};
export default SignUp;
