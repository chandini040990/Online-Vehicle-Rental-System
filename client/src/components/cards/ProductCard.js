import { Badge } from "antd";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { useState } from "react";
import React, {useEffect } from 'react';
import axios from "axios";

export default function ProductCard({ p }) {
  // context
  const [cart, setCart] = useCart();
  const [testimonials, setTestimonials] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [hover, setHover] = useState(0);
  // state
  const [feedback, setFeedback] = useState({});

  // hooks
  const navigate = useNavigate();


  return (
    <div className={`${p?.booked >= 1 ? "disabled" : "card mb-3 hoverable"}`}>
      {/* <div className="card mb-3 hoverable"> */}
      <Badge.Ribbon text={`${p?.booked >= 1 ? "Booked" : "Not booked"}`} color="red">
        < Badge.Ribbon
          text={`${p?.quantity >= 1
            ? `Vehicle is available`
            : "Vehicle not available"
            }`
          }
          placement="start"
          color="green"
        >

          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Badge.Ribbon >
      </Badge.Ribbon >

      <div className="card-body">
        <h1 className="text-center">{p?.name}</h1>
        <div className="d-flex flex-col">
          <p><span className="text-orange-500">Brand:</span> {p?.brand}</p>
          <p><span className="text-orange-500">Plate Number:</span> {p?.plateNumber}</p>
          <p><span className="text-orange-500">Engine:</span> {p?.engine}</p>
          <p><span className="text-orange-500">Transmission:</span> {p?.transmission}</p>
        </div>

        <h4 className="fw-bold text-center">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}/Day
        </h4>

        <p className="card-text">{p?.description?.substring(0, 60)}...</p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn bg-blue text-white col card-button"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          View Details
        </button>
      </div>
    </div >
  );
}
