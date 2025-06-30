const Order = ({ Data }) => {
  const productDetail = JSON.parse(Data.details);
  return (
    <>
      <ul className="list-group " style={{ width: "700px", margin: "20px" }}>
        <li
          className="list-group-item "
          aria-current="true"
          style={{ fontWeight: "bold", backgroundColor: "#f5faf9" }}
        >
          Order ID: #{Data.orderId} | Date: {Data.date} | Total Price: Rs{" "}
          {Data.total_price} | Status:
          {Data.status}
        </li>
        {productDetail.map((detail) => {
          return (
            <li
              className="list-group-item"
              style={{ backgroundColor: "#f0f7f7" }}
            >
              <div className="row">
                <div className="col-2">
                  <img src={detail.image_Url} width="70" />
                </div>
                <div className="col-5">
                  <p style={{ fontWeight: "bold" }}>{detail.item_name}</p>
                  <p>Qty: 1</p>
                </div>
                <div className="col-2" style={{ fontWeight: "bold" }}>
                  Rs {detail.current_price}
                </div>
              </div>
            </li>
          );
        })}
        ;
      </ul>
    </>
  );
};
export default Order;
