import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [ratings, setRatings] = useState(0);
    const [hover, setHover] = useState(0);
    // state
    const [feedback, setFeedback] = useState({});


    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        try {
            const { data } = await axios.get("/feedback/get");
            // console.log("data", data)
            setTestimonials(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>

            <div className="container-fluid border-top border-bottom mx-auto text-center mb-4">
                <h2 className="text-4xl font-bold text-blue-900 mb-8">Testimonials</h2>
                <p className="text-lg text-gray-700 font-normal mb-8">What our customers say about us</p>
                <div className="container overflow-hidden">

                    {testimonials.length === 0 ? (
                        <p className="text-3xl text-black font-normal mb-8">No reviews yet.</p>
                    ) : (
                        <div className="row gx-5 gy-5 mt-3 mb-5">
                            {testimonials?.map((c) => (
                                <div className="col-md-6 my-4" key={c._id}>

                                    <div className="bg-white p-10 text-center rounded-lg shadow-lg w-100 h-auto">
                                        <img style={{ height: '20%', width: '15%', marginLeft:"42%",marginTop: '5px' }} src="images/icon.png" alt="icon" />
                                        <h2 className="fw-bold">{c.name}</h2>
                                        <p className="card-text">{c.reviews}</p>
                                        {/* <p className="card-text">{c.ratings}</p> */}
                                        <div className="star-rating">
                                            {[...Array(5)].map((star, index) => {
                                                index += 1;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={index}
                                                        className={index <= (hover || c.ratings) ? "on" : "off"}
                                                        value={c.ratings}
                                                        // onClick={() => setRatings(index)}
                                                        // onMouseEnter={() => setHover(index)}
                                                        // onMouseLeave={() => setHover(c.ratings)}
                                                        disabled
                                                    >
                                                        <span className="star">&#9733;</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </>
    );
} 
