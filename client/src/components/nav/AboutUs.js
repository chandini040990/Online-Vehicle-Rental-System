// import "./App.css"

function AboutUs() {
    return (
        <>

            <div className="heading">
                <h1 className="lead">About Us</h1>
                <p>WHEELS 4 RENT is a local car rental provider with more than 25 years of experience in the car rental industry.</p>
            </div>
            <div className="container">
                <section className="about">
                    <div className="about-image">
                        <img src="images/car.png" alt="aboutus" />
                    </div>
                    <div className="about-content">
                        <h2> Why choose us?</h2>
                        <p>Book directly through our website.Vehicle make and model guaranteed, not “similar” to those selected - 
                            Same day rental - Hotel and airport delivery/collection - Flexible terms and payment options for long term rental
                            - 24/7 telephone contact</p><br/>
                        <p> We pride ourselves on personalized service, great cars and excellent rates. </p>
                    </div>
                </section>
            </div >


        </>
    )
}

export default AboutUs