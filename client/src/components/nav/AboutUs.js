// import "./App.css"

function AboutUs() {
    return (
        <>
            <div className="container-fluid text-black border-top border-2">
                <div className="row">
                    <div className="d-flex">
                        <img src="images/car.png" alt="aboutus" style={{ height:'80%',width: '100%' }} />
                        <div className="align-items-center">
                            <h1 className="lead">About Us</h1>
                            <p>WHEELS 4 RENT is a local car rental provider with more than 25 years of experience in the car rental industry.</p><br />

                            <p>Why choose us?</p>

                            <p>-          book directly through our website;</p>

                            <p>-          vehicle make and model guaranteed, not “similar” to those selected;</p>

                            <p>-          same day rental;</p>

                            <p> -          hotel and airport delivery/collection;</p>

                            <p> -          flexible terms and payment options for long term rental;</p>

                            <p> -          “commission free” rental;</p>

                            <p> -          24/7 telephone contact;</p><br />

                            <p>We offer a varied fleet of cars, ranging from the compact Toyota Yaris to 7-seaters, and SUVs. All our vehicles have air conditioning,  power steering, electric windows. All our vehicles are bought and maintained at official dealerships only. Automatic transmission cars are available in every booking class.</p><br />

                            <p> We pride ourselves on personalized service, great cars and excellent rates. </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs