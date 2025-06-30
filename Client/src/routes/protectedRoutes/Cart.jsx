import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/CartItem";
import { useEffect } from "react";
import axios from "axios";
import { cartSliceAction } from "../../store/cartSlice";
import { useState } from "react";
const Cart = () => {
  const cartProducts = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductsFromDb = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(import.meta.env.VITE_CART_URL, {
          headers: {
            Authorization: token,
          },
        });

        dispatch(cartSliceAction.setCartFromDb(response.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductsFromDb();
  }, []);

  let totalItem = cartProducts.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  const CONVENIENCE_FEES = 99;

  cartProducts.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  const HandlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const productDetails = cartProducts.map((product) => {
        return {
          item_name: product.item_name,
          image_Url: product.image_Url,
          current_price: product.current_price,
        };
      });
      const order_details = {
        date: new Date().toLocaleDateString(),
        totalPrice: finalPayment,
        status: "Delivered",
        details: JSON.stringify(productDetails),
      };
      const response = await axios.post(
        import.meta.env.VITE_ORDER_URL,
        {
          data: order_details,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Your order has been successfully placed, Have a nice day");
    } catch (err) {
      console.log(err);
    }
  };

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;
  return (
    <>
      <div className="cart">
        <div className="cartItems">
          {cartProducts.map((product) => (
            <CartItem Data={product}></CartItem>
          ))}
        </div>

        <div className="cartSummary">
          <div className="bag-details-container">
            <div
              className="price-header"
              style={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              PRICE DETAILS ({totalItem} Items){" "}
            </div>
            <div className="price-item">
              <span className="price-item-tag" style={{ fontWeight: "bold" }}>
                Total MRP
              </span>
              <span
                className="price-item-value"
                style={{ float: "right", fontWeight: "bold" }}
              >
                ₹{totalMRP}
              </span>
            </div>
            <div className="price-item">
              <span className="price-item-tag" style={{ fontWeight: "bold" }}>
                Discount on MRP
              </span>
              <span
                className="price-item-value priceDetail-base-discount"
                style={{ float: "right", fontWeight: "bold", color: "blue" }}
              >
                -₹{totalDiscount}
              </span>
            </div>
            <div className="price-item">
              <span className="price-item-tag" style={{ fontWeight: "bold" }}>
                Convenience Fee
              </span>
              <span
                className="price-item-value"
                style={{ float: "right", fontWeight: "bold" }}
              >
                ₹99
              </span>
            </div>
            <hr />
            <div className="price-footer">
              <span className="price-item-tag" style={{ fontWeight: "bold" }}>
                Total Amount
              </span>
              <span
                className="price-item-value"
                style={{ float: "right", fontWeight: "bold" }}
              >
                ₹{finalPayment}
              </span>
            </div>
          </div>
          <div className="d-grid gap-2" style={{ marginTop: "20px" }}>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Place Order
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Confirmation Window
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    "You're about to place your order. Please review your cart
                    items and total amount before confirming. Once confirmed,
                    the order cannot be modified.
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      class="btn btn-primary"
                      onClick={HandlePlaceOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
