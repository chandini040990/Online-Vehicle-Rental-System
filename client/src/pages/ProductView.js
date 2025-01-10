import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";


export default function ProductView() {
  // context
  const [cart, setCart] = useCart();
  // state
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [bookingFrom, setBookingFrom] = useState("");
  const [bookingTo, setBookingTo] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  // hooks
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug)
      loadProduct();
  }, [params?.slug]);


  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (err) {
      console.log(err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("bookingFrom", bookingFrom);
      productData.append("bookingTo", bookingTo);
      productData.append("fromLocation", fromLocation);
      productData.append("toLocation", toLocation);


      if (bookingFrom || bookingTo || fromLocation || toLocation !== '') {

        // if (bookingTo < bookingFrom) {
        //   toast.error("Booking to date should be greater than booking from")
        // }

        // if (fromLocation === toLocation) {
        //   toast.error("From location and To location cannot be same")
        // }

        const { data } = await axios.put(`/product-update/${product._id}`, { bookingFrom, bookingTo, fromLocation, toLocation });
        // console.log("datainbooking", data);
        setProduct(data);
        setCart([...cart, product]);
        navigate("/cart");
        toast.success("Added to cart");
      } else {
        toast.error("All fields are required");
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="card mb-3">
            <Badge.Ribbon text={`Booked`} color="red">
              <Badge.Ribbon
                text={`${product?.quantity >= 1
                  ? `Vehicle is available`
                  : "vehicle not available"
                  }`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                  alt={product.name}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>

            <div className="card-body">
              <h1 className="fw-bold text-center">{product?.name}</h1>
              <p className="fw-bold"><span className="text-orange-500">Brand:</span> {product?.brand}</p>
              <p className="fw-bold"><span className="text-orange-500">Engine:</span> {product?.engine}</p>
              <p className="fw-bold"><span className="text-orange-500">Transmission:</span> {product?.transmission}</p>
              <p className="fw-bold">
                <FaDollarSign /> <span className="text-orange-500">Price:</span>{" "}
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}/Day
              </p>
              <p className="fw-bold">
                <FaProjectDiagram /><span className="text-orange-500"> Category:</span> {product?.category?.name}
              </p>
              <p>
                <FaRegClock /><span className="text-orange-500">Added:</span> {moment(product.createdAt).fromNow()}
              </p>

              <p>
                {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                {product?.quantity > 0 ? "Is Available" : "Not Available"}
              </p>

              <p>
                <FaWarehouse /><span className="text-orange-500">Available</span> {product?.quantity - product?.booked}
              </p>

              <p>
                <FaRocket /><span className="text-orange-500">Booked</span> {product.booked}
              </p>
              <p className="card-text">{product?.description}</p>


              <div>
                <label>Booking From:
                  <input
                    type="Date"
                    className="form-control p-2 mb-3"
                    placeholder="Select a date"
                    value={bookingFrom}
                    onChange={(e) => setBookingFrom(e.target.value)}
                    required
                  />
                </label></div>

              <div>
                <label>Booking To:
                  <input
                    type="Date"
                    className="form-control p-2 mb-3"
                    placeholder="Select a date"
                    value={bookingTo}
                    onChange={(e) => setBookingTo(e.target.value)}
                    required
                  /> </label>  </div>

              <div><label>From Location:
                <input
                  type="text"
                  className="form-control p-2 mb-3"
                  placeholder="Enter from location"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  required
                /> </label>  </div>

              <div> <label>To Location:
                <input
                  type="text"
                  className="form-control p-2 mb-3"
                  placeholder="Enter to location"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  required
                /> </label>  </div>

              <button onClick={handleSubmit} className="btn btn-primary mb-5 w-full">
                Submit
              </button>

            </div>
          </div>
        </div>
      </div>


      <div className="col-md-3">
        <h2>Related Products</h2>
        <hr />
        {related?.length < 1 && <p>Nothing found</p>}
        {related?.map((p) => (
          <ProductCard p={p} key={p._id} />
        ))}
      </div>
    </div>
  );
}
