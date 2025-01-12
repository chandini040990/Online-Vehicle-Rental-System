// import "./App.css"

function Footer() {
    return (
        <>

            <div className="container-fluid bg-blue">
                <footer className="py-5">
                    <div className="row justify-content-between">

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Quick Links</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-body-secondary-orange">Home</a></li>
                                <li className="nav-item mb-2"><a href="cars" className="nav-link p-0  text-body-secondary-orange">Cars</a></li>
                                {/* <li className="nav-item mb-2"><a href="/search" className="nav-link p-0 text-body-secondary-orange">Search</a></li>  */}
                                {/* <li className="nav-item mb-2"><a href="aboutus" className="nav-link p-0 text-body-secondary-orange">About Us</a></li> */}
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Office Timings</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="#phone" className="nav-link p-0 text-body-secondary-orange">From 10 am to 8 pm</a></li>
                                <li className="nav-item mb-2"><a href="#email" className="nav-link p-0 text-body-secondary-orange">24x7 Support available</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Contacts</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="#address" className="nav-link p-0 text-body-secondary-orange">Address: 5/23 AB Anna Nagar,Chennai</a></li>
                                <li className="nav-item mb-2"><a href="#phone" className="nav-link p-0 text-body-secondary-orange">Phone: +91 XXX3526111</a></li>
                                <li className="nav-item mb-2"><a href="#email" className="nav-link p-0 text-body-secondary-orange">Email : wheels4rent@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center py-2 my-2 border-top">
                        <p>&copy; 2024 Wheels 4 Rent, Inc. All rights reserved.</p>
                    </div>

                </footer >
            </div >
        </>
    )
}

export default Footer